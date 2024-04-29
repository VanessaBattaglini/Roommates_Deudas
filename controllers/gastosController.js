import { getGastosQuery, addGastosQuery, deleteGastosQuery, editGastoQuery } from "../queries/gastos.js";
import { recalcularDeudas } from "../queries/roommates.js";
const getGastos = async (req, res) => {
  try {
    const results = await getGastosQuery();
    res.json(results);
  } catch (error) {
    console.log(error.message);
  }
};
const addGastos = async (req, res) => {
  try {
    const gasto = req.body;
    console.log(req.body)
    const results = await addGastosQuery(gasto);
    recalcularDeudas();
    res.send('agregando gastos')
  } catch (error) {
    console.log(error.message)
  }
};

const deleteGastos = async (req, res) => {
  try {
    const { id } = req.query;
    const results = await deleteGastosQuery(id);
    recalcularDeudas();
    console.log(results)
    res.send("gastos eliminado");
  } catch (error) {
    console.log(error.message);
  }
};

const editGasto = async (req, res) => {
  try {
    const id = req.query.id;
    const gasto = req.body;
    await recalcularDeudas();
    await editGastoQuery(id, gasto);

    res.send("Gasto editado");
  } catch (error) {
    console.log(error);
  }
};

export {
  getGastos,
  addGastos,
  deleteGastos, 
  editGasto
}