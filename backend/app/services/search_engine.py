"""
TF-IDF vector space search engine over portfolio data.
Adapted from Data Mining project (CSE 5334) by An Lam.
"""
import math
import re
from typing import List, Dict, Tuple


STOP_WORDS = {
    "a","an","the","and","or","but","in","on","at","to","for","of","with",
    "by","from","is","was","are","were","be","been","being","have","has",
    "had","do","does","did","will","would","could","should","may","might",
    "i","we","you","he","she","it","they","my","our","your","his","her","its",
    "this","that","these","those","as","up","out","not","no","so","if","its",
    "via","per","into","than","then","also","using","used","use","based","built",
}


def _tokenize(text: str) -> List[str]:
    pattern = r'\w+(?:[\-/]\w+)*'
    return re.findall(pattern, text.lower())


def _stem(word: str) -> str:
    """Simple suffix-stripping stemmer (good enough for portfolio terms)."""
    suffixes = ["ing", "tion", "tions", "ations", "ation", "ness", "ment",
                "ments", "ers", "ed", "es", "s"]
    for suffix in suffixes:
        if len(word) > len(suffix) + 3 and word.endswith(suffix):
            return word[:-len(suffix)]
    return word


def _preprocess(text: str) -> List[str]:
    tokens = _tokenize(text)
    return [_stem(t) for t in tokens if t not in STOP_WORDS and len(t) > 2]


def _build_doc_text(item: dict, doc_type: str) -> str:
    """Combine all relevant fields into a single searchable text blob."""
    parts = []
    if doc_type == "project":
        parts.append(item.get("title", "") * 3)  # boost title
        parts.append(item.get("description", ""))
        parts.extend(item.get("achievements", []))
        parts.extend(item.get("technologies", []))
        parts.extend(item.get("tags", []))
        parts.append(item.get("stack", ""))
        parts.append(item.get("category", ""))
    elif doc_type == "experience":
        parts.append(item.get("title", "") * 3)
        parts.append(item.get("company", ""))
        parts.extend(item.get("highlights", []))
        parts.extend(item.get("technologies", []))
    return " ".join(str(p) for p in parts)


class SearchEngine:
    def __init__(self):
        self.docs: Dict[str, dict] = {}         # doc_id -> original item
        self.doc_types: Dict[str, str] = {}     # doc_id -> "project" | "experience"
        self.posting_list: Dict[str, List[Tuple[str, float]]] = {}
        self.idf: Dict[str, float] = {}
        self._built = False

    def build(self, portfolio_data: dict):
        raw_docs: Dict[str, List[str]] = {}

        for project in portfolio_data.get("projects", []):
            doc_id = f"project_{project['id']}"
            self.docs[doc_id] = project
            self.doc_types[doc_id] = "project"
            raw_docs[doc_id] = _preprocess(_build_doc_text(project, "project"))

        for job in portfolio_data.get("experience", []):
            doc_id = f"experience_{job.get('id', job.get('company', ''))}"
            self.docs[doc_id] = job
            self.doc_types[doc_id] = "experience"
            raw_docs[doc_id] = _preprocess(_build_doc_text(job, "experience"))

        # Term frequencies per doc
        freq_table: Dict[str, Dict[str, int]] = {}
        for doc_id, tokens in raw_docs.items():
            freq_table[doc_id] = {}
            for token in tokens:
                freq_table[doc_id][token] = freq_table[doc_id].get(token, 0) + 1

        # Doc frequency (how many docs contain each term)
        df: Dict[str, int] = {}
        for doc_id, freqs in freq_table.items():
            for token in freqs:
                df[token] = df.get(token, 0) + 1

        n = len(raw_docs)
        self.idf = {token: math.log10(n / count) for token, count in df.items()}

        # TF-IDF weights
        tfidf: Dict[str, Dict[str, float]] = {}
        for doc_id, freqs in freq_table.items():
            tfidf[doc_id] = {}
            for token, freq in freqs.items():
                tf = 1 + math.log10(freq) if freq > 0 else 0
                tfidf[doc_id][token] = tf * self.idf[token]

        # Normalize document vectors
        norm_matrix: Dict[str, Dict[str, float]] = {}
        for doc_id, weights in tfidf.items():
            magnitude = math.sqrt(sum(w ** 2 for w in weights.values()))
            if magnitude > 0:
                norm_matrix[doc_id] = {t: w / magnitude for t, w in weights.items()}

        # Build posting list: token -> [(doc_id, norm_weight), ...] sorted desc
        self.posting_list = {}
        for doc_id, tokens in norm_matrix.items():
            for token, weight in tokens.items():
                if token not in self.posting_list:
                    self.posting_list[token] = []
                self.posting_list[token].append((doc_id, weight))
        for token in self.posting_list:
            self.posting_list[token].sort(key=lambda x: x[1], reverse=True)

        self._built = True

    def search(self, query: str, top_k: int = 5) -> List[dict]:
        if not self._built:
            return []

        query_tokens = _preprocess(query)
        if not query_tokens:
            return []

        # Build query TF-IDF vector
        q_freq: Dict[str, int] = {}
        for token in query_tokens:
            q_freq[token] = q_freq.get(token, 0) + 1

        q_weights: Dict[str, float] = {}
        for token, freq in q_freq.items():
            if token in self.idf:
                tf = 1 + math.log10(freq) if freq > 0 else 0
                q_weights[token] = tf * self.idf[token]

        if not q_weights:
            return []

        # Normalize query vector
        magnitude = math.sqrt(sum(w ** 2 for w in q_weights.values()))
        if magnitude == 0:
            return []
        q_norm = {t: w / magnitude for t, w in q_weights.items()}

        # Cosine similarity via dot product of normalized vectors
        scores: Dict[str, float] = {}
        for token, q_weight in q_norm.items():
            if token in self.posting_list:
                for doc_id, doc_weight in self.posting_list[token]:
                    scores[doc_id] = scores.get(doc_id, 0) + q_weight * doc_weight

        # Sort and return top_k
        ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_k]

        results = []
        for doc_id, score in ranked:
            if score > 0:
                results.append({
                    "type": self.doc_types[doc_id],
                    "score": round(score, 4),
                    "data": self.docs[doc_id],
                })
        return results


# Singleton instance — built once at startup
search_engine = SearchEngine()
