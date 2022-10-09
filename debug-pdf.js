const pdf = require("pdf-creator-node");
const fs = require("fs");
const os = require("os");
require("dotenv").config();

const tmpdirPath = os.tmpdir();
const tempdir = fs.realpathSync(tmpdirPath);

function createPdf(mailOptions){
  // Read HTML Template
  const html = fs.readFileSync(__dirname + "/public/templates/template.html", "utf8");
  const avatar = fs.readFileSync(__dirname + "/public/assets/avatar/1.jpg").toString('base64');
  const stamp = fs.readFileSync(__dirname + "/public/assets/cert/stamp.svg").toString('base64');

  let options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
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
      avatar: avatar,
      stamp: stamp,
      apiurl: process.env.IS_PROD === "true" ?  process.env.API_URL : process.env.ALT_API_URL,
    },
    path: `${tempdir}/wwa.pdf`,
    type: "",
  };

  pdf.create(document, options)
    .then((res) => {
      console.debug(res);
    })
    .catch((error) => {
      console.error(error);
    });
}

createPdf()