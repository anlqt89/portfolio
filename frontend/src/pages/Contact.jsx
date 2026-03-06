import { Send } from "lucide-react";
import { useFavicon } from "../components/SetFavicon";
import Github from 'lucide-react/dist/esm/icons/github';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import Mail from 'lucide-react/dist/esm/icons/mail';
import { MyContact } from "../data/MyContact";
import { FAVICON_TITLES } from "../data/FaviconTitles";
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";

export default function Contact() {
  useFavicon(`${FAVICON_TITLES.PORTFOLIO} | ${FAVICON_TITLES.CONTACT}`);
  
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");



  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("");

    // console.log("SERVICE:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    // console.log("TEMPLATE:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    // console.log("PUBLIC KEY:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    // console.log("FORM:", form.current);
    
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          setStatus("✅ Message sent successfully!");
          setIsSending(false);
          form.current.reset();
        },
        (error) => {
          console.error('Error sending email:', error.text);
          setStatus("❌ Failed to send message. Try again later.");
          setIsSending(false);
        }
      );
  };

  return (
    <section id="contact" className="lg:pl-16 min-h-screen bg-[#020617] pt-32 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side */}
        <div className="space-y-8">
          <div>
            <h2 className="text-5xl font-black mb-6 text-white leading-tight">
              Let's build <br />
              <span className="text-emerald-500">something meaningful</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              I design and deploy full-stack systems where performance, data integrity, and infrastructure meet.
            </p>
          </div>

          <div className="space-y-4">
            <a href={`mailto:${MyContact.email}`} className="flex items-center gap-4 group w-fit">
              <div className="p-3 bg-slate-900 border border-slate-800 group-hover:border-emerald-500/50 transition-colors rounded-lg">
                <Mail className="text-emerald-400" size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email Me</p>
                <p className="text-slate-200 group-hover:text-emerald-400 transition-colors">{MyContact.email}</p>
              </div>
            </a>

            <div className="flex gap-4 pt-4">
              <a href={`https://www.linkedin.com/in/${MyContact.linkedin}`} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/20">
                <Linkedin size={24} />
              </a>
              <a href={`https://github.com/${MyContact.github}`} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all shadow-lg hover:shadow-emerald-500/20">
                <Github size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-slate-900/40 border border-slate-800/50 p-8 lg:p-10 rounded-3xl relative backdrop-blur-sm shadow-2xl">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-[80px] -z-10" />
          
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all text-slate-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="johndoe@email.com"
                  required
                  className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all text-slate-200"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Message</label>
              <textarea 
                rows="4"
                name="message"
                placeholder="If you’re building something and need an extra set of hands, I’m happy to help."
                required
                className="w-full bg-[#020617] border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all text-slate-200 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSending}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all group shadow-lg shadow-emerald-600/20 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSending ? "Sending..." : "Send Message"}
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            {status && (
              <p className="text-center text-sm text-slate-400 pt-2">{status}</p>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
