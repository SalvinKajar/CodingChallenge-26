import React, { useState, useEffect } from "react";
import { findTrades } from "../../services/TradeServices";
import styles from "./Pets.module.scss";

export const Trades = () => {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
    findTrades()
            .then(({data}) => {
            setTrades(data);
            });
    }, []);
  return (
    <>
        { trades.map(trade => 
        <div className={styles.trades}>

          <div className={styles.elements}>
             
             
        </div>
            <div className={styles.elements}>
              <div >ID</div> 
              <div>{trade.id}</div>
            </div>

            <div className={styles.elements}>
              <div >ISIN</div> 
            <div>{trade.isin}</div>
        </div>

            <div className={styles.elements}>
                <div>CUSIP:</div>
                <div> {trade.cusip}</div>
            </div>

            <div className={styles.elements}>
                <div>ISSUER:</div>
                <div> {trade.issuer}</div>
            </div>

            <div className={styles.elements}>
                <div>MATUARITY: </div>
                <div>{trade.maturitydate.slice(0,10)}</div>
            </div>


                <div className={styles.elements}>
                  <div>COUPON</div>
                <div>{trade.coupon}</div>
                </div>

                <div className={styles.elements}>
                <div>TYPE:</div>
                <div> {trade.type}</div>
                
                </div>

                <div className={styles.elements}>
                <div>FACEVALUE: </div>
                <div>{trade.facevalue}</div>
                </div>
                <div className={styles.elements}>
                  <div>STATUS:</div>
                <div> {trade.status}</div>
                </div>

           
            
            
          
           
            
            

        </div>) 
        }
    </>
  )
};
