// productoController.test.js
const { insert } = require('../controllers/productoController');

// Mock de express para simular req y res
const mockReq = (body) => ({
  body,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// Mock del método "save" del modelo Producto
jest.mock('../models/productos', () => {
    class MockProducto {
      save() {
        return Promise.reject(new Error('simulated_error')); // Devolvemos una promesa rechazada con el error
      }
    }
    return new MockProducto(); // Importante: instanciamos la clase MockProducto y la devolvemos
  });
  
describe('Prueba de insert', () => {
  test('Debería crear un producto correctamente', async () => {
    const req = mockReq({
      codigo_barra: '+56950118453',
      nombre_producto: 'Manzana',
      precio_unitario: 1000,
      unidad: 'unidad',
      stock: 100,
    });

    const res = mockRes();

    await insert(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ crearProducto: producto });
  });

  test('Debería manejar errores al crear un producto', async () => {
    const req = mockReq({
        codigo_barra: '123456789',
        nombre_producto: 1,
        precio_unitario: 10.10,
        unidad: 'unidad',
        stock: "100",
    });

    const res = mockRes();

    await insert(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Error al crear productoError: simulated_error' });
  });
});
