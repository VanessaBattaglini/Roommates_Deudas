import path from "path";
const __dirname = import.meta.dirname;
import { addRoommateQuery, getRoommatesQuery, recalcularDeudas } from "../queries/roommates.js";


const home = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
};

const addRoommate = async (req, res) => {
    try {
        const result = await addRoommateQuery();
        recalcularDeudas();
        res.redirect('/');
    } catch (error) {
        console.log(error.message)
    }
};

const getRoommates = async (req, res) => {
    try {
        const results = await getRoommatesQuery();
        res.json(results)
    } catch (error) {
        console.log(error.message);
    }
}


export {
    home,
    addRoommate,
    getRoommates
}