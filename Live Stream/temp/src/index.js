import express from "express";
import fs from "fs";
const app = express();
import hls from "hls-server";
import path from "path";
const __dirname = path.resolve();

app.get("/", (req, res) => {
  return res.status(200).sendFile(`${__dirname}/src/client.html`);
});

const server = app.listen(5000);

new hls(server, {
  provider: {
    exists: (req, cb) => {
      const ext = req.url.split(".").pop();
      if (ext !== "m3u8" && ext !== "ts") {
        return cb(null, true);
      }
      fs.access(
        __dirname + "/src" + req.url,
        fs.constants.F_OK,
        function (err) {
          if (err) {
            return cb(null, false);
          }
          cb(null, true);
        }
      );
    },
    getManifestStream: (req, cb) => {
      const stream = fs.createReadStream(__dirname + "/src" + req.url);
      cb(null, stream);
    },
    getSegmentStream: (req, cb) => {
      const stream = fs.createReadStream(__dirname + "/src" + req.url);
      cb(null, stream);
    },
  },
});
