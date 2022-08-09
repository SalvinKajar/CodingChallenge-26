package com.db.grad.javaapi.model;

import java.util.Date;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "trades")
public class Trades {
	
	@Id
	public long id;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name="book_id")
	public Books book;
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name="counterparty_id")
	public Counterparties counterparty;
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name="security_id")
	public Securities security;
	
	public long quantity;
	public String status;
	public long price;
	public String buysell;
	public Date tradedate;
	public Date settlementdate;

	public Trades(){
		
	}
	
	public Trades(long id, Books book, Counterparties counterparty, Securities security, long quantity, String status,
			long price, String buysell, Date tradedate, Date settlementdate) {
		super();
		this.id = id;
		this.book = book;
		this.counterparty = counterparty;
		this.security = security;
		this.quantity = quantity;
		this.status = status;
		this.price = price;
		this.buysell = buysell;
		this.tradedate = tradedate;
		this.settlementdate = settlementdate;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	@Column(name = "bookid", nullable = false)
	public Books getBook() {
		return book;
	}

	public void setBook(Books book) {
		this.book = book;
	}
	
	@Column(name = "counterpartyid", nullable = false)
	public Counterparties getCounterparty() {
		return counterparty;
	}

	public void setCounterparty(Counterparties counterparty) {
		this.counterparty = counterparty;
	}
	
	@Column(name = "securityid", nullable = false)
	public Securities getSecurity() {
		return security;
	}

	public void setSecurity(Securities security) {
		this.security = security;
	}
	
	@Column(name = "quantity", nullable = false)
	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	
	@Column(name = "status", nullable = false)
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	@Column(name = "price", nullable = false)
	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}
	
	@Column(name = "buysell", nullable = false)
	public String getBuysell() {
		return buysell;
	}

	public void setBuysell(String buysell) {
		this.buysell = buysell;
	}
	
	@Column(name = "tradedate", nullable = false)
	public Date getTradedate() {
		return tradedate;
	}

	public void setTradedate(Date tradedate) {
		this.tradedate = tradedate;
	}
	
	@Column(name = "settlementdate", nullable = false)
	public Date getSettlementdate() {
		return settlementdate;
	}

	public void setSettlementdate(Date settlementdate) {
		this.settlementdate = settlementdate;
	}
	
	
}