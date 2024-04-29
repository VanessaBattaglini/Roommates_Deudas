import axios from 'axios';
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

const urlApi = "https://randomuser.me/api";

//Construir datos del usuario
const addRoommateQuery = async (req, res) => {
    try {
        const data = await axios.get(urlApi);
        const userData = data.data.results[0]
        const id = uuidv4().slice(0, 5);
        const usuario = {
            id,
            nombre: `${userData.name.first} ${userData.name.last}`,
            email: userData.email,
            debe: 0,
            recibe: 0
        };
        const roommateJson = await JSON.parse(fs.readFileSync('data/roommates.json', 'utf8'));
        roommateJson.roommates.push(usuario)
        fs.writeFileSync('data/roommates.json', JSON.stringify(roommateJson));
    } catch (error) {
        console.log(error.message)
    }
};

const getRoommatesQuery = async (req, res) => {
    try {
        const roommateJson = await JSON.parse(
            fs.readFileSync("./data/roommates.json", "utf8"));
        return roommateJson;
    } catch (error) {
        console.log(error)
    }
};

//función para calcular la distribución equitativa de las deudas
const recalcularDeudas = () => {
  // Lectura de archivos JSON una sola vez al principio de la función
    const roommatesData = fs.readFileSync("./data/roommates.json", "utf8");
    const gastosData = fs.readFileSync("./data/gastos.json", "utf8");

    const { roommates } = JSON.parse(roommatesData);
    const { gastos } = JSON.parse(gastosData);

  // Inicialización de las deudas y créditos de cada roommate
    roommates.forEach((r) => {
        r.debe = 0;
        r.recibe = 0;
        r.total = 0;
    });

    // Cálculo de deudas y créditos
    gastos.forEach((g) => {
        const montoPorPersona = g.monto / roommates.length;
        roommates.forEach((r) => {
        if (g.roommate === r.nombre) {
            r.recibe += montoPorPersona * (roommates.length - 1);
        } else {
            r.debe -= montoPorPersona;
        }
        r.total = (r.recibe - r.debe).toFixed(2);
        });
    });

    // Escritura del archivo JSON con los datos actualizados
    fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
};


export { addRoommateQuery, getRoommatesQuery, recalcularDeudas };