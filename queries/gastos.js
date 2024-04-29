import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const getGastosQuery = async (req, res) => {
    try {
        const gastosJson = await JSON.parse(
            fs.readFileSync("./data/gastos.json", "utf8"));
        return gastosJson;
    } catch (error) {
        console.log(error)
    }
};
const addGastosQuery = async (gasto) => {
    try {
        gasto.fecha = new Date();
        gasto.id = uuidv4().slice(0, 5);

        const gastosJson = await JSON.parse(
            fs.readFileSync("./data/gastos.json", "utf8")
        );
        gastosJson.gastos.push(gasto);
        fs.writeFileSync("./data/gastos.json", JSON.stringify(gastosJson));
    
    } catch (error) {
        console.log(error.message)
    }
};
const deleteGastosQuery = async (id) => {
    try {
        const gastosJson = await fs.readFileSync("./data/gastos.json", "utf8");
        let { gastos } = JSON.parse(gastosJson)
        gastos = gastos.filter(results => results.id !== id);
        await fs.writeFileSync('./data/gastos.json', JSON.stringify({gastos}))
    } catch (error) {
        console.log(error.message);
    }
};

const editGastoQuery = async (id, gasto) => {
    try {
        const gastosJSON = await fs.readFileSync("data/gastos.json", "utf8");
        let { gastos } = JSON.parse(gastosJSON);
        gastos = gastos.map((g) => {
            if (g.id == id) {
                const newData = gasto;
                newData.id = id;
                return newData;
            }
            return g;
            });
            await fs.writeFileSync("data/gastos.json", JSON.stringify({ gastos }));
        } catch (error) {
            console.log(error.message)
        }
};

export {
    getGastosQuery,
    addGastosQuery,
    deleteGastosQuery,
    editGastoQuery
}
