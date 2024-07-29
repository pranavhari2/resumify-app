from flask import Flask, request, jsonify, send_from_directory
import openai
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import os
from pypdf import PdfReader
import docx2txt
from werkzeug.utils import secure_filename
from openai import OpenAI
from flask_cors import CORS

# Load Api key 
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

app = Flask(__name__)
CORS(app)

# Add folder for storage
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Add routers 
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/generate-cover-letter', methods=['POST'])
def generate_cover_letter_endpoint():

    company_name = request.form.get('company_name')
    position = request.form.get('position')
    description = request.form.get('description')
    resume = request.files['resume']

    filename = secure_filename(resume.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    resume.save(file_path)

    # Exract text from pdf
    reader = PdfReader(file_path) 
    page = reader.pages[0] 
    resume_text = page.extract_text() 

    cover_letter = generate_cover_letter(company_name, position, description, resume_text)

    return jsonify({"cover_letter": cover_letter})


# def scrape(url):
#     resp = requests.get(url)
#     soup = BeautifulSoup(resp.text, 'html.parser')
#     comp_name = soup.find('title').text

#     return comp_name


def generate_cover_letter(company_name, position, description, resume):
    openai.api_key = openai_api_key
    
    prompt = f"Write a cover letter for a {position} position at {company_name}. \
        Mention the company's values, recent projects, and emphazise on why I would be a good fit. \
        Here is my resume:\n{resume} and here is the job description {description}. 
        Think about how I would be a good fit and analyze your options after doing a thorough scan of my resume. \
        Try to write a letter that would be written by a human."

    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="gpt-4o-mini",
    )

    return chat_completion.choices[0].message.content

if __name__ == '__main__':
    app.run(debug=True)
