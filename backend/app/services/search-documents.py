## Project 1
### An Lam - 1002319896
### Data Mining - CSE 5334 - 005
### Dr. Marnim Galib 
### TA. Raoa Faria Karim

import os 
import nltk 
import math
from nltk.tokenize import RegexpTokenizer
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords


nltk.download('stopwords')

corpusroot = './US_Inaugural_Addresses'
filenames = []
docs = {}

for filename in os.listdir(corpusroot):
    if filename.endswith('.txt'):
        file = open(os.path.join(corpusroot, filename), "r", encoding='windows-1252')
        doc = file.read()
        file.close() 
        doc = doc.lower()
        docs[filename] = doc

# Tokenize all words
def tokenizeDocs(docs):
    pattern = r'\w+(?:[\-/.]\w+)*'    #Find the pattern: start with word = [a-zA-Z0-9_]+ one or many time, then go after with -word or /word or .word zero or many time
    tokenizer = RegexpTokenizer(pattern)
    tnizedDocs = {}
    for filename, doc in docs.items():
        docTokens = tokenizer.tokenize(doc)
        tnizedDocs[filename] = docTokens

    return tnizedDocs
def removeStopwords(tnizedDocs):
    noSWDocs = {}
    for filename, tdoc in tnizedDocs.items():
        noSWDocs[filename] = [token for token in tdoc if token not in stopwordsSet]
    return noSWDocs

def porterStemming(noSWDocs):
    stemmer = PorterStemmer()
    stemedDocs = {}
    for filename, noSWDoc in noSWDocs.items():
        stemedDocs[filename] = [stemmer.stem(stemedW) for stemedW in noSWDoc]
    return stemedDocs

# Build Sequential table
def buildFreqTable(stemedDocs):
    seqDocs = {}
    for filename, tokens in stemedDocs.items():
        seqTokens = {}
        for token in tokens:
            seqTokens[token] = seqTokens.get(token, 0) + 1
        seqDocs[filename] = seqTokens
    return seqDocs
def getTfDocTable(seqDocs):
    dTfs = {} #tfs tables
    #Loop all stemmed tokenized frequential documentts 
    for filename, tokens in seqDocs.items(): #{06_madison_1809.txt} : {jame :  1}, {depart :  1}, ...
        for token, freq in tokens.items(): # jame, 1 in tokens
            dTfs[token] = dTfs.get(token, 0) + 1 #count += 1
    return dTfs 
def getIDFsTable(tfsTable, numOfDocs):
    idfsTable = {}
    for token, tf in tfsTable.items():
        idfsTable[token] = tf/numOfDocs
    return tfsTable
def getidf(token):
    if token in IDFsTable:
        return IDFsTable[token]
    return -1

def getTfsTable(seqDocs):
    tfsTable = {}
    for filename, tokens in seqDocs.items():
        tfTokens = {}
        for token, freq in tokens.items():
            tfTokens[token] = 0 if freq == 0 else 1 + math.log10(freq)
        tfsTable[filename] = tfTokens
    return tfsTable
    
def gettf(filename, token):
    if token in tfsTable[filename]:
        return tfsTable[filename][token]
    return -1

def getIfIDFTable(iDFsTable, tfsTable):
    wtd = {}
    for filename, TFs in tfsTable.items():
        wtd[filename] = {}
        for token, tf in TFs.items():
            wtd[filename][token] = tfsTable[filename][token]*iDFsTable[token]
    return wtd
def getweight(filename, token):
    if filename in IfiDfsTable and token in IfiDfsTable[filename]:
        return IfiDfsTable[filename][token]
    return 0

#find nomination = sqrt(sum(wi^2))
def getDocNorm(wDoc = {"token": -1, "token2": -2}):
    #find sum(wi^2)
    var = 0
    for token, w in wDoc.items():
        var += w**2
    std = math.sqrt(var)
    normDoc = {}
    for token, w in wDoc.items():
        normDoc[token] = w/std
        
    return normDoc
def getAllDocNorms(wtd):
    normMatrix = {}
    for filename, weights in wtd.items():
        normMatrix[filename] = getDocNorm(weights)
    return normMatrix
def getQueryNom(searchString):
    que = {}
    que['searchString'] = searchString.lower()
    tquery = tokenizeDocs(que)
    noSWquery = removeStopwords(tquery)
    stemedQuery = porterStemming(noSWquery)
    freqQuery = buildFreqTable(stemedQuery)
    tfsQuery = getTfsTable(freqQuery)
    idfQuerys = {}
    for token, tf in freqQuery['searchString'].items():
        idfQuerys[token] = getidf(token)
    weightQueries = getIfIDFTable(idfQuerys, tfsQuery)
    norQueries = getDocNorm(weightQueries["searchString"])
    noms = {}
    for token, norm  in norQueries.items():
        if norm >= 0:
            noms[token] = norm
    return noms
def getPostingList(normMatrix):
    sortedTokens = {}
    #Loop normalized documents revresed (doc1: {token1: weight1}, {token2: weight2}...} => {token1: {doc1: weight1}, {doc2: weight1}...}
    for filename, tokens in normMatrix.items():
          for token, weight in tokens.items():
              if token in sortedTokens:
                  sortedTokens[token][filename] = weight
              else:
                  sortedTokens[token] = {filename : weight}
    #sort by Values to rank docs for each token
    for token, docs in sortedTokens.items():
        sortedTokens[token] = sorted(sortedTokens[token].items(), key=lambda x: x[1], reverse= True)
        
    return sortedTokens

def getTopDocs(normQuery, postingList, k):
    topK = {}
    for token, weight in normQuery.items():
        if token in postingList:
            topK[token] = postingList[token][:k]
    return topK
def countDocInTopK(topk):
    countDoc = {} # {filename: count}
    for token, docs in topk.items():
        for filename, weight in docs:
            countDoc[filename] = countDoc.get(filename, 0) + 1
    return countDoc

def getSims(countDoc, topK, norQueries):
    trueSim = {}
    upperSim = {}
    notAppearSim = 0
    for token, topDocs in topK.items():
        wtq = norQueries[token]
        notAppearSim += wtq*topDocs[-1][1] #not in top K
        
        for filename, wtd in topDocs:
            if countDoc[filename] == len(norQueries):
                trueSim[filename] = trueSim.get(filename, 0) + wtq*wtd
            else:
                upperSim[filename] = upperSim.get(filename, 0) + wtq*topDocs[-1][1]
                
    return trueSim, upperSim,notAppearSim

def findMaxActualScore(trueSim, upperSim,notAppearSim):
    if not trueSim:
        return "fetch more", 0 #not Found True Sim and score is 404

    #Assign maxscore as notAppearSim
    maxScore = notAppearSim
    maxFile = 'All'
    for filename, actualScore in trueSim.items(): #Search all actual scores
        if  actualScore >= maxScore:
            maxScore = actualScore
            maxFile = filename
            
    for filename, upperScore in upperSim.items(): #Compare all upper Scores
       if upperScore > maxScore:
           return "fetch more", 0 #Not Found True Sim >= all sims
            
    
    return maxFile, maxScore
def query(searchString):
    normQ = getQueryNom(searchString)
    k = 10
    topKDocs = getTopDocs(normQ, postingList, k)
    if not topKDocs:
        return "None", 0
    countDoc = countDocInTopK(topKDocs)
    trueSim, upperSim,notAppearSim = getSims(countDoc, topKDocs, normQ)
    maxFile, maxScore = findMaxActualScore(trueSim, upperSim,notAppearSim)
    if maxFile:
        return maxFile, maxScore
        
    return "fetch more", 0

# tnizedDocs = tokenizeDocs(docs)
# stopwordsSet = set(stopwords.words('english'))
# noSWDocs = removeStopwords(tnizedDocs) #No stop words docs
# stemedDocs = porterStemming(noSWDocs)
# seqDocs = buildFreqTable(stemedDocs)
# TfDocTable = getTfDocTable(seqDocs)
# IDFsTable = getIDFsTable(TfDocTable, len(docs))
# tfsTable = getTfsTable(seqDocs)
# IfiDfsTable = getIfIDFTable(IDFsTable, tfsTable)  
# normMatrix = getAllDocNorms(IfiDfsTable)
# postingList = getPostingList(normMatrix)

# print("%.12f" % getidf('british'))
# print("%.12f" % getidf('union'))
# print("%.12f" % getidf('war'))
# print("%.12f" % getidf('power'))
# print("%.12f" % getidf('great'))
# print("%.12f" % getidf('thisisatestonnothing'))
# print("%.12f" % getidf('separate word'))
# print("--------------")
# print("%.12f" % getweight('19_lincoln_1861.txt','states'))
# print("%.12f" % getweight('07_madison_1813.txt','war'))
# print("%.12f" % getweight('12_jackson_1833.txt','union'))
# print("%.12f" % getweight('22_grant_1873.txt','proposition'))
# print("%.12f" % getweight('09_monroe_1821.txt','revenue'))

# print("(%s, %.12f)" % query("pleasing people"))
# print("(%s, %.12f)" % query("foreign government"))
# print("(%s, %.12f)" % query("public rights"))
# print("(%s, %.12f)" % query("texas government"))
# print("(%s, %.12f)" % query("states laws"))
# print("(%s, %.12f)" % query(" martin van buren\t1837-03-04\tfellow-citizens: the practice of all my predecessors imposes on me an obligation"))
