import 'dotenv/config'; 
import expressApp  from "./expressApp.js";

const StartServer =  async () => {
   
    const PORT = process.env.PORT || 8081;
    console.log("PORT => ",process.env.PORT)
    expressApp.listen(PORT , () => {
        console.log("Server started on port => ", PORT)
    })

    process.on("uncaughtException", async (err) => {
        console.log(err);
        process.exit(1);
    })
}

StartServer().then(() => {
    console.log("Server is up");
})