import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.data.portfolio_data import PORTFOLIO_DATA
from app.core.config import EMAIL_ADDRESS, EMAIL_PASSWORD

router = APIRouter(tags=["contact"])


class ContactMessage(BaseModel):
    name: str
    email: str
    message: str


@router.get("/contact")
async def get_contact():
    return PORTFOLIO_DATA.get("contact", {})


@router.post("/contact/send")
async def send_contact_email(body: ContactMessage):
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Portfolio Contact: {body.name}"
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = EMAIL_ADDRESS
        msg["Reply-To"] = f"{body.name} <{body.email}>"

        html = f"""
        <p><strong>Name:</strong> {body.name}</p>
        <p><strong>Email:</strong> <a href="mailto:{body.email}">{body.email}</a></p>
        <p><strong>Message:</strong><br>{body.message}</p>
        """
        msg.attach(MIMEText(html, "html"))

        confirmation = MIMEMultipart("alternative")
        confirmation["Subject"] = "Thanks for reaching out!"
        confirmation["From"] = EMAIL_ADDRESS
        confirmation["To"] = body.email
        confirmation.attach(MIMEText(f"""
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 24px; text-align: left;">
            <span style="font-size: 22px; font-weight: 900; letter-spacing: -0.025em; color: #ffffff;">
              AN <span style="color: #10b981; text-shadow: 0 0 12px rgba(16, 185, 129, 0.4);">LAM</span>.
            </span>
          </div>
          <div style="padding: 32px; color: #334155; line-height: 1.6;">
            <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 0;">Hi {body.name},</p>
            <p>Thank you for reaching out through my portfolio. I've received your message and appreciate the interest in my background.</p>
            <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 16px; margin: 24px 0;">
              <p style="margin: 0; font-size: 15px; font-style: italic;">
                "I am currently exploring new opportunities and would love to hear more about your team's technical goals and how I can contribute."
              </p>
            </div>
            <p>I will get back to you shortly to coordinate a time for us to connect.</p>
            <p style="margin-bottom: 0;">Talk soon,</p>
          </div>
          <div style="padding: 32px; background-color: #f1f5f9; border-top: 1px solid #e2e8f0;">
            <div style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">An Lam</div>
            <div style="font-size: 13px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">MS Computer Science • UT Arlington</div>
            <div style="font-size: 13px; color: #94a3b8;">BS Computer Science • Texas Tech</div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #cbd5e1;">
              <a href="https://anlam.app" style="color: #10b981; text-decoration: none; font-size: 13px; font-weight: 700; margin-right: 16px;">PORTFOLIO</a>
              <a href="https://www.linkedin.com/in/anlamtech/" style="color: #10b981; text-decoration: none; font-size: 13px; font-weight: 700; margin-right: 16px;">LINKEDIN</a>
              <a href="https://github.com/anlqt89" style="color: #10b981; text-decoration: none; font-size: 13px; font-weight: 700;">GITHUB</a>
            </div>
          </div>
        </div>
        """, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
            smtp.send_message(confirmation)

        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
