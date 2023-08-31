import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiURL = "https://api.clashroyale.com/v1/players/%23";
const apiToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImNjM2E0ZTA4LTNkMmYtNDQ2MS05NGY2LWQxNTM5NWFkMGVlMSIsImlhdCI6MTY5MzQ5OTU1Mywic3ViIjoiZGV2ZWxvcGVyL2U5MTViZTE1LTFiZjctYjIxMC01NTA1LTlhYWM3NTU4NzQ1NCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMDIuNTEuNzYuNDIiXSwidHlwZSI6ImNsaWVudCJ9XX0.7kzV1W-4FBDOGIXOjQeMkv9zS_DR7iHwZXZrhwdXBoIwa5TUpUj277yicavSf9c6uWHI2fOreQlUbRgBUvZq7g";
app.use(express.static("public"));

//To pass form data to index.ejs, bodyparser middleware is used.
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", async(req, res)=> {
    res.render("index.ejs");
});

app.post("/generate", async(req, res) => {
    const playerTag = req.body.playerTag.toUpperCase();
    try {
        const player = await axios.get(`${apiURL}${playerTag}`, {
            headers: 
                {
                    Authorization: `Bearer ${apiToken}`
                }
        }); 

        const chest = await axios.get(`${apiURL}${playerTag}/upcomingchests`, {
            headers: 
                {
                    Authorization: `Bearer ${apiToken}`
                }
        }); 

        res.render("index.ejs", 
          {
            playerStats:player.data,
            playerChest:chest.data
          });
      } 
      
      catch (error) {
        console.log(error.response.data);
        res.render("index.ejs", 
          {
            playerTag:playerTag
          });
      }
});