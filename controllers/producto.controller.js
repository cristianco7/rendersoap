import { getProductoModel,getProductoUnicoModel , postProductoModel, deleteProductoModel, updateProductoModel  } from "../models/producto.model.js";
 
export const getAll = async (req, res) =>{
    let data = await   getProductoModel(); 
    res.json({success: true, data: data ,   msg : 'get All'})
}

 

export async function getProducto(req, res) {
    const id = req.params.id; 

    try {
        const data = await getProductoUnicoModel(id);
        if (data) {
            res.json({ success: true, data: data, msg: 'Producto encontrado' });
        } else {
            res.status(404).json({ success: false, data: [], msg: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, data: [], msg: 'Error al obtener el producto' });
    }
}



export async function postProducto(req, res) {
    const { nombre, detalle, valor } = req.body;

    try {
        const result = await postProductoModel(nombre, detalle, valor);
        res.json({ success: true, data: [], msg: result });
    } catch (error) {
        res.status(500).json({ success: false, data: [], msg: "Error al insertar el producto" });
    }
}


export async function deleteProducto(req, res) {
    const id = req.params.id; 

    try {
        const result = await deleteProductoModel(id);
        res.json({ success: true, data: [], msg: result });
    } catch (error) {
        res.status(500).json({ success: false, data: [], msg: "Error al eliminar el producto" });
    }
}

export async function updateProducto(req, res) {
    const id = req.params.id; 
    const { nombre, detalle, valor } = req.body;

    try {
        const result = await updateProductoModel(id, nombre, detalle, valor);
        res.json({ success: true, data: [], msg: result });
    } catch (error) {
        res.status(500).json({ success: false, data: [], msg: "Error al actualizar el producto" });
    }
}
