import pgService from "../services/pg.service.js";

export const getProductoModel = async () => {
    const pg =  new pgService(); 
    return  await  pg.connection.query("SELECT * FROM producto");
}
 
export const getProductoUnicoModel = async (id) => {
    const pg =  new pgService(); 
    return  await  pg.connection.query(`SELECT * FROM producto
    where id_producto =  $1`, [id]);
}
export const postProductoModel = async (nombre, detalle, valor ) => {
    try{
        const pg =  new pgService(); 
        pg.connection.none(`INSERT INTO PRODUCTO 
        (NOMBRE, DETALLE , VALOR)  
        VALUES 
        ($1, $2, $3)
        ` ,[nombre,detalle, valor]);
        return  'Transacción realizada';
    }catch(error){ 
        return 'En este momento no se puede realizar su transacción';
    }

}

export const deleteProductoModel = async (id) => {
    try {
        if (!id || isNaN(id)) {
            throw new Error('ID de producto no válido');
        }
        
        const pg = new pgService();
        const existingProduct = await pg.connection.oneOrNone(
            'SELECT * FROM PRODUCTO WHERE id_producto = $1',
            [id]
        );

        if (!existingProduct) {
            throw new Error('El producto no existe');
        }

        await pg.connection.none(
            'DELETE FROM PRODUCTO WHERE id_producto = $1',
            [id]
        );

        return 'Producto eliminado correctamente';
    } catch (error) {
        throw error;
    }
};


export const updateProductoModel = async (id, nombre, detalle, valor) => {
    try {
        const pg = new pgService();
        await pg.connection.none(
            `UPDATE PRODUCTO 
            SET NOMBRE = $2, DETALLE = $3, VALOR = $4
            WHERE id_producto = $1`,
            [id, nombre, detalle, valor]
        );
        return 'Producto actualizado correctamente';
    } catch (error) {
        throw error;
    }
};
 