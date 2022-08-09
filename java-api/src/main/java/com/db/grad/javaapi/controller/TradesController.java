package com.db.grad.javaapi.controller;
import javax.validation.Valid;
import java.text.SimpleDateFormat; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Securities;
import com.db.grad.javaapi.model.Trades;
import com.db.grad.javaapi.repository.SecuritiesRepository;
import com.db.grad.javaapi.repository.TradesRepository;

import com.db.grad.javaapi.repository.BooksRepository;
import com.db.grad.javaapi.repository.CounterpartiesRepository;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v2")
public class TradesController {
	@Autowired
	private TradesRepository tradesRepository;
	
	@Autowired
	private SecuritiesRepository securitiesRepository;

	@Autowired
	private BooksRepository booksRepository;
	@Autowired
	private CounterpartiesRepository counterpartiesRepository;

    Long id;


    public TradesController() {
        id=1L;
    }

	  @GetMapping("/alltrades")
    public List < Trades > getAllTrades() {
        List < Trades > trade = tradesRepository.findAll();

         return trade;
    }
	
//	Get trade by ID
	@GetMapping("/trades/{id}")
	public List<Trades> getTradeById(@PathVariable(value="id") Long id) 
	throws ResourceNotFoundException{
		List < Trades > trades = tradesRepository.findAll();
      List < Trades > result=new ArrayList<Trades>(); 
      for(int i=0;i<trades.size();i++){
        if(trades.get(i).id==id){
            result.add(trades.get(i));
            break;
        }

      }
            
            
        return result;
	}
	
//	Retrieve security to which the trade belongs
	@GetMapping("/securities/trade/{id}")
	public List<Securities> getSecurityByTrade(@PathVariable(value="id") Long id)
	throws ResourceNotFoundException{
		Trades trades = tradesRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Trade not found for id " +id));
		Securities security = trades.getSecurity();
        List<Securities> result = new ArrayList<Securities>();
       result.add(security);
        return result;
	}
	
//	Create and update a trade
    @CrossOrigin
	@PostMapping("/trades/{id}/{bid}/{sid}/{cid}/{quantity}/{status}/{price}/{buysell}/{tradedate}/{settlementdate}")
	public Trades createTrade(@PathVariable(value = "id") Long id,@PathVariable(value = "bid") Long bid,@PathVariable(value = "sid") Long sid,@PathVariable(value = "cid") Long cid,
	@PathVariable(value = "quantity") int quantity,@PathVariable(value = "status") String status,
	@PathVariable(value = "price") Long price,@PathVariable(value = "buysell") String buysell,@PathVariable(value = "tradedate") String tradedate,
	@PathVariable(value = "settlementdate")String settlementdate) throws ResourceNotFoundException,Exception{


		Trades trade = new Trades();
		trade.id=this.id;
        this.id = this.id+1;
		Date d1=new SimpleDateFormat("yyyy-MM-dd").parse(tradedate);
		Date d2=new SimpleDateFormat("yyyy-MM-dd").parse(settlementdate);
		trade.security = securitiesRepository.findById(sid)
            .orElseThrow(() -> new ResourceNotFoundException("security not found for this id :: " + sid));
		
		trade.quantity=quantity;
		trade.status=status;
		trade.price=price;
		trade.buysell=buysell;
		trade.tradedate=d1;
		trade.settlementdate=d2;

		trade.book = booksRepository.findById(bid)
            .orElseThrow(() -> new ResourceNotFoundException("security not found for this id :: " + bid));
		
		trade.counterparty = counterpartiesRepository.findById(cid)
            .orElseThrow(() -> new ResourceNotFoundException("security not found for this id :: " + cid));
		
		






		
		return tradesRepository.saveAndFlush(trade);

		// return trade;
	}

	// @PostMapping("/trades/{bid}/{cid}/{sid}")
	// public Trades createTrade(@Valid @RequestBody Trades trades, @PathVariable(value="bid") Long bid, 
	// 		@PathVariable(value="cid") Long cid, @PathVariable(value="sid") Long sid) {
	// 	// trades.setSecurity(securitiesRepository.findById(sid));
	// 	System.ou
	// 	return tradesRepository.saveAndFlush(trades);
	// }
	
	@PutMapping("/trades/{id}")
    public ResponseEntity < Trades > updateTrade(@PathVariable(value = "id") Long id,
        @Valid @RequestBody Trades tradeDetails) throws ResourceNotFoundException {
    	Trades getTrades = tradesRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Trade not found for this id :: " + id));

    	getTrades.setBook(tradeDetails.getBook());
    	getTrades.setCounterparty(tradeDetails.getCounterparty());
    	getTrades.setSecurity(tradeDetails.getSecurity());
    	getTrades.setQuantity(tradeDetails.getQuantity());
        getTrades.setStatus(tradeDetails.getStatus());
        getTrades.setPrice(tradeDetails.getPrice());     
        getTrades.setBuysell(tradeDetails.getBuysell());
        getTrades.setTradedate(tradeDetails.getTradedate());
        getTrades.setSettlementdate(tradeDetails.getSettlementdate());
    	
        final Trades updatedTrades = tradesRepository.save(getTrades);
        return ResponseEntity.ok(updatedTrades);
    }
}