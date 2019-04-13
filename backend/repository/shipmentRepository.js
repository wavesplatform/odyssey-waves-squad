var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})



async function createShipment (shipment) {
  console.log("createClaim");
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO shipments (sender, recipient, countryfrom, countryto, departuredate, policeid, carrier, title, createdate, status, arrivaldate, device) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', 
        [
          shipment.sender, 
          shipment.recipient, 
          shipment.from, 
          shipment.to, 
          shipment.departureDate, 
          shipment.PoliciId,
          shipment.carrier, 
          shipment.title, 
          shipment.createDate,
          shipment.status,
          shipment.arrivalDate,
          shipment.device
        ], (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        if(results)
            resolve(results.rows);
          resolve();
      })
    })
  }


async function update (shipment) {
return new Promise((resolve, reject) => {
  pool.query('UPDATE shipment SET sender = $2, recipient = $3, countryfrom = $4, countryto = $5, departuredate = $6, policeid = $7, carrier = $8, title = $9, createdate = $10, status = $11, arrivaldate = $12, device = $13 WHERE id = $1',
      [
        shipment.id,
        shipment.sender,
        shipment.recipient,
        shipment.from,
        shipment.to,
        shipment.departureDate,
        shipment.PoliciId,
        shipment.carrier,
        shipment.title,
        shipment.createDate,
        shipment.status,
        shipment.arrivalDate,
        shipment.device
      ], (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        if(results)
            resolve(results.rows);
          resolve();
      })
})
}

async function getShipments() {
  console.log("getClaims");
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM shipments ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve();
    });
  })
}

async function getShipmentsBySenderId (userId) {
  console.log("getClaims");
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM shipments WHERE sender = $1  ORDER BY id ASC', [userId],  (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve([]);
    });
  })
}

async function getShipmentsByRecipientId (userId) {
  console.log("getClaims");
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM shipments WHERE recipient = $1 ORDER BY id ASC', [userId],  (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve([]);
    });
  })
}

async function getShipmentsByCarrierId (userId) {
  console.log("getClaims");
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM shipments WHERE carrier = $1 ORDER BY id ASC', [userId],  (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve([]);
    });
  })
}


async function findById (shipmentId) {
  console.log("findShipmentByid")
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM shipments WHERE id = $1', [shipmentId], (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve();
    })
  })
}

async function findByDeviceId (deviceId) {
  console.log("findShipmentByid");
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM shipments WHERE device = $device', [deviceId], (error, results) => {
      if (error) {
        reject(error);
      }
      console.log(results)
      resolve(results.rows);
    })
  })
}

  module.exports = {
    createShipment:createShipment,
  getShipments:getShipments,
  findById:findById,
  getShipmentsBySenderId:getShipmentsBySenderId,
  getShipmentsByRecipientId:getShipmentsByRecipientId,
  getShipmentsByCarrierId:getShipmentsByCarrierId,
  findShipmentByDeviceId:findShipmentByDeviceId,
  updateShipment:updateShipment
  };