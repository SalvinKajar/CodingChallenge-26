package com.db.grad.javaapi.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.*;

@Entity

@Table(name = "securities")
public class Securities {

	@Id
	public long id;
	private long isin;
	private long cusip;
	private String issuer;
	public Date maturitydate;
	private long coupon;
	private String type;
	private long facevalue;
	private String status;

	 public Securities() {

    }
    
    public Securities(long id, long isin,long cusip, String issuer,Date maturitydate,
	 long coupon,
	 String type,
	 long facevalue,
	 String status) {
    	this.id=id;
        this.isin=isin;
        this.cusip=cusip;
        this.issuer=issuer;
        this.maturitydate=maturitydate;
        this.coupon=coupon;
        this.type=type;
        this.facevalue=facevalue;
        this.status=status;

    }

    @Id
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    
    @Column(name = "isin", nullable = false)
    public long getIsin() {
        return isin;
    }
    public void setIsin(long isin) {
        this.isin=isin;
    }

    @Column(name = "cusip", nullable = false)
    public long getCusip() {
        return cusip;
    }
    public void setCusip(long cusip) {
        this.cusip = cusip;
    }

    @Column(name = "issuer", nullable = false)
    public String getIssuer() {
        return issuer;
    }
    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

     @Column(name = "maturitydate", nullable = false)
    public Date getMaturitydate() {
        return maturitydate;
    }
    public void setMaturitydate(Date maturitydate) {
        this.maturitydate = maturitydate;
    }


     @Column(name = "coupon", nullable = false)
    public long getCoupon() {
        return coupon;
    }
    public void setCoupon(long coupon) {
        this.coupon = coupon;
    }

     @Column(name = "type", nullable = false)
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

     @Column(name = "facevalue", nullable = false)
    public long getFacevalue() {
        return facevalue;
    }
    public void setFacevalue(long facevalue) {
        this.facevalue = facevalue;
    }

     @Column(name = "status", nullable = false)
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
	
	
    
    
}