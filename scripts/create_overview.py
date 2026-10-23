from pathlib import Path
import json
from PIL import Image, ImageDraw
from reportlab.graphics.barcode.qrencoder import QRCode, QRErrorCorrectLevel
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
URLS = {'website': 'https://www.mhtechfusion.com/', 'linkedin': 'https://www.linkedin.com/company/mhtechfusion/posts/'}
for name, url in URLS.items():
    qr = QRCode(4, QRErrorCorrectLevel.M)
    qr.addData(url)
    qr.make()
    n = qr.getModuleCount()
    scale, border = 10, 4
    im = Image.new('RGB', ((n + 2 * border) * scale,) * 2, 'white')
    d = ImageDraw.Draw(im)
    for y in range(n):
        for x in range(n):
            if qr.isDark(y, x):
                d.rectangle(((x+border)*scale, (y+border)*scale, (x+border+1)*scale-1, (y+border+1)*scale-1), fill='#112b3b')
    im.save(ASSETS / f'{name}-qr.png')
(ASSETS / 'qr-destinations.json').write_text(json.dumps(URLS, indent=2))

pdfmetrics.registerFont(TTFont('DVS', str(ROOT / 'scripts/fonts/DejaVuSans.ttf')))
pdfmetrics.registerFont(TTFont('DVS-Bold', str(ROOT / 'scripts/fonts/DejaVuSans-Bold.ttf')))
W, H = 595.276, 841.89
INK, BLUE, MUTED, LINE, BG = map(HexColor, ['#112b3b','#4b7eaf','#596971','#dbe2e6','#f3f7fa'])
OUT = ASSETS / 'MHTechFusion_Company_Overview.pdf'
c = Canvas(str(OUT), pagesize=(W,H))
c.setTitle('MHTechFusion | Company Overview & Selected Portfolio')
c.setAuthor('MHTechFusion')
c.setSubject('Embedded engineering, IoT and connected product development')

def rect(x, top, w, h, color):
    c.setFillColor(color); c.rect(x,H-top-h,w,h,fill=1,stroke=0)
def txt(x, top, text, size=10, font='DVS', color=INK):
    c.setFillColor(color); c.setFont(font,size); c.drawString(x,H-top-size,text)
def para(x, top, text, w, size=9, color=MUTED, leading=None, bold=False):
    s=ParagraphStyle('body',fontName='DVS-Bold' if bold else 'DVS',fontSize=size,leading=leading or size*1.5,textColor=color)
    p=Paragraph(text,s);pw,ph=p.wrap(w,1000);p.drawOn(c,x,H-top-ph);return ph
def line(x,top,w):
    c.setStrokeColor(LINE);c.setLineWidth(.5);c.line(x,H-top,x+w,H-top)
def img(path,x,top,w,h):
    c.drawImage(str(path),x,H-top-h,width=w,height=h,preserveAspectRatio=True,anchor='c',mask='auto')
def link(x,top,w,h,url):
    c.linkURL(url,(x,H-top-h,x+w,H-top),relative=0,thickness=0)

rect(0,0,W,146,INK)
rect(34,29,42,42,white)
img(ASSETS/'company-mark.png',36,31,38,38)
txt(88,28,'MHTechFusion',25,'DVS-Bold',white)
txt(89,62,'Fusion of Code, Circuits, and Creativity.',9,'DVS',HexColor('#c5d7e3'))
txt(34,100,'From circuit to complete product.',23,'DVS-Bold',white)
txt(34,155,'COMPANY OVERVIEW  /  SELECTED PORTFOLIO',8,'DVS-Bold',BLUE)
para(34,175,'One engineering team connecting hardware, firmware, mechanical design and intelligent software. We support startups, researchers and product teams from concept and prototype through system integration.',527,9.2,leading=14)

txt(34,225,'ENGINEERING SERVICES',8,'DVS-Bold',BLUE)
services=[
 ('Embedded & PCB design','Architecture, schematics, PCB layout and bring-up.'),
 ('Firmware & connectivity','Drivers, RTOS, sensor integration and BLE / Wi-Fi.'),
 ('CAD & enclosure design','Mechanical CAD, product enclosures and hardware fit.'),
 ('IoT, apps & cloud','Connected devices, apps, dashboards and automation.'),
 ('Edge AI & computer vision','On-device inference, AI/ML and vision integration.'),
 ('Industrial automation & CI/CD','PLC / HMI integration, monitoring and build pipelines.')]
for i,(title,desc) in enumerate(services):
    x=34+(i%2)*274; top=247+(i//2)*43
    txt(x,top,title,9.3,'DVS-Bold')
    para(x,top+15,desc,253,7.8,leading=11)
line(34,378,527)
txt(34,394,'SELECTED PROJECTS',8,'DVS-Bold',BLUE)

rect(34,417,527,127,BG)
txt(47,427,'01 / AUTOMOTIVE',7,'DVS-Bold',BLUE)
txt(47,444,'SmartPTI truck inspection',12,'DVS-Bold')
para(47,466,'BLE tyre pressure and temperature sensing, custom PCB, firmware and enclosure. Integrated IMU, GPS, SD storage, microphone, buzzer and inspection display.',250,8.4,leading=12.2)
txt(47,522,'SENSORS  +  PCB  +  FIRMWARE  +  ENCLOSURE',6.6,'DVS-Bold',BLUE)
img(ASSETS/'truck-inspection.png',312,427,236,107)

rect(34,556,527,133,BG)
txt(47,566,'02 / MEDICAL-DOMAIN TECHNOLOGY',7,'DVS-Bold',BLUE)
txt(47,583,'Wearable & stimulation platform',11.4,'DVS-Bold')
para(47,605,'Sensor wristband with PPG, temperature and motion monitoring; BLE mobile integration; app-controlled stimulation; Firebase authentication, session storage and history.',250,8.4,leading=12.2)
txt(47,666,'WEARABLE  +  MOBILE APP  +  STIMULATOR  +  CLOUD',6.2,'DVS-Bold',BLUE)
img(ASSETS/'medical-platform.png',312,565,236,115)

line(34,708,527)
txt(34,722,'LET’S BUILD YOUR NEXT CONNECTED PRODUCT.',8,'DVS-Bold',BLUE)
txt(34,744,'mhtechfusion@gmail.com',10,'DVS-Bold')
link(34,744,220,15,'mailto:mhtechfusion@gmail.com')
txt(34,763,'+49 176 76102577  |  mhtechfusion.com',8.5)
link(34,763,115,13,'tel:+4917676102577')
link(154,763,130,13,URLS['website'])
txt(34,782,'Freiburg, Germany',8,color=MUTED)
txt(34,814,'MHTechFusion  |  Company overview 2026',7,color=MUTED)
for name,x,label in [('website',392,'WEBSITE'),('linkedin',482,'LINKEDIN')]:
    img(ASSETS/f'{name}-qr.png',x,739,72,72)
    txt(x+15,815,label,6.5,'DVS-Bold',BLUE)
    link(x,739,72,85,URLS[name])
c.showPage();c.save()
print(OUT)
