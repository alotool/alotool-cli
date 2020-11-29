const fs = require('fs');
const gulp = require('gulp');
const fetch = require('node-fetch');

gulp.task('default', function (done) {
  let themeXML = fs.readFileSync('test/tasks/blogger/template/theme.xml', 'utf8');
  //console.log(themeXML);
  let xml = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?><!DOCTYPE html><html><head><title><data:blog.pageTitle/></title><b:skin></b:skin></head><body><b:section id=\"header\"/><h1 class=\"welcome\">Welcome Blogger!</h1></body></html>";
  let themeEncode = encodeURIComponent(xml);
  console.log(themeEncode);
  var s = "f.req=%5B%5B%5B%22ZmRkFc%22%2C%22%5B%5C%225210147448283309506%5C%22%2C%5B%5C%225210147448283309506%5C%22%2C%5C%22";
  var e = "%5C%22%2C1%2C%5B%5D%5D%2Ctrue%2Cfalse%2Ctrue%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=AG0M1HOorzaNE51LqTAPViZTjxuG%3A1606665981987&";
  //console.log(themeEncode)

  let themeDecode = decodeURIComponent(themeEncode);
  console.log(themeDecode);


  fetch("https://www.blogger.com/_/BloggerUi/data/batchexecute?rpcids=ZmRkFc&f.sid=-8283365557771444448&bl=boq_bloggeruiserver_20201126.00_p0&hl=vi&soc-app=174&soc-platform=1&soc-device=1&_reqid=483184&rt=c", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en,en-US;q=0.9,vi;q=0.8",
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "sec-ch-ua": "\"Chromium\";v=\"86\", \"\\\"Not\\\\A;Brand\";v=\"99\", \"Google Chrome\";v=\"86\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-same-domain": "1",
      "cookie": "OTZ=5735851_28_28__28_; _ga=GA1.2.22932857.1606456494; SID=4AeXUSg9W_KPfGmJNpOAhomk5wjkKCI71nvZKQariTZK8apD2TKsxQMytTVfgzfcJde-EQ.; __Secure-3PSID=4AeXUSg9W_KPfGmJNpOAhomk5wjkKCI71nvZKQariTZK8apDARgCsIf5eo7i4Dtgs7dHZA.; HSID=AZrv0jYP1R0nYKBwY; SSID=AntovR5IoVXwsVmSS; APISID=G5Rca8oCcRZsLg7I/A6OL88o2YwjrG4ZUO; SAPISID=8T7faoTuftXM5-HV/AmtnbZnT_qZNbIJhh; __Secure-3PAPISID=8T7faoTuftXM5-HV/AmtnbZnT_qZNbIJhh; NID=204=Md6TtQEdcTScSeNZ1USWpTYj_w31YuY1gzx_HLOvn46WRij2YI5hwZkmlwPKzuuak3mPMz-f4QEc2-uqLgepkjZKhuPNwKAarjKSGZ827wV9sYEbuNBvRBVhi5wsovIMXL4BWO8trDhQt6YlLEc-n4nR6sqUQ_idyzNPmw4wSYO8tBBemgcgiY8W_cseYx1mh9M0nQEsYcKpnCvH70-gLAMptAvWsuqvBTf61iwH7yJv7oqDsZk_UE3-Xsy6LJM0_nMyBSR2L4BYNbYrxIBz1nko-A"
    },
    "referrer": "https://www.blogger.com/",
    "referrerPolicy": "origin",
    "body": "f.req=%5B%5B%5B%22ZmRkFc%22%2C%22%5B%5C%225210147448283309506%5C%22%2C%5B%5C%225210147448283309506%5C%22%2C%5C%22%3C%3Fxml%20version%3D%5C%5C%5C%221.0%5C%5C%5C%22%20encoding%3D%5C%5C%5C%22UTF-8%5C%5C%5C%22%20%3F%3E%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3Ctitle%3E%3Cdata%3Ablog.pageTitle%2F%3E%3C%2Ftitle%3E%3Cb%3Askin%3E%3C%2Fb%3Askin%3E%3C%2Fhead%3E%3Cbody%3E%3Cb%3Asection%20id%3D%5C%5C%5C%22header%5C%5C%5C%22%2F%3E%3Ch1%20class%3D%5C%5C%5C%22welcome%5C%5C%5C%22%3EWelcome%20Blogger!%3C%2Fh1%3E%3C%2Fbody%3E%3C%2Fhtml%3E%5C%22%2C1%2C%5B%5D%5D%2Ctrue%2Cfalse%2Ctrue%5D%22%2Cnull%2C%22generic%22%5D%5D%5D&at=AG0M1HOorzaNE51LqTAPViZTjxuG%3A1606665981987&",
    "method": "POST",
    "mode": "cors"
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.error(err)
  });
  done();
});
