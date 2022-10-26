const pdf = require("pdf-creator-node");
const fs = require("fs");
const os = require("os");
require("dotenv").config();

const tmpdirPath = os.tmpdir();
const tempdir = fs.realpathSync(tmpdirPath);

function createPdf(params, callback){
  // Read HTML Template
  const html = fs.readFileSync(__dirname + "/public/templates/template.html", "utf8");
  //const avatar = fs.readFileSync(__dirname + `/public/assets/avatar/${params.avatar}.jpg`).toString('base64');
  //const stamp = fs.readFileSync(__dirname + "/public/assets/cert/stamp.svg").toString('base64');
  const wwaCert = fs.readFileSync(__dirname + `/public/assets/wwa_cert.png`).toString('base64');

  let options = {
    format: "A4",
    orientation: "portrait",
    border: "0mm",
    /*
    header: {
      height: "45mm",
      contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
      height: "28mm",
      contents: {
          first: 'Cover page',
          2: 'Second page', // Any page number is working. 1-based index
          default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
      }
    }
    */
  };

  let document = {
    html: html,
    data: {
      apiurl: process.env.IS_PROD === "true" ?  process.env.API_URL : process.env.ALT_API_URL,
      wwaCert: wwaCert,
      params: params,
    },
    path: `${tempdir}/wwa.pdf`,
    type: "",
  };

  pdf.create(document, options)
    .then((res) => {
      console.debug(res);
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

const params = {
  wwaText: "Ich notiere ein halbes Jahr lang, welche Kleider ich trage. Was ich in dieser Zeit nicht anziehe, verschenke ich oder gebe es in den Secondhand-Handel.",
  wwaNumber: "D - 000001"
}

createPdf(params, () => {
  console.log("PDF created")
})
