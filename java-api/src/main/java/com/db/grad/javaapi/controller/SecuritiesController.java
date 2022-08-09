package com.db.grad.javaapi.controller;

import java.util.HashMap;
import java.lang.*;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Securities;
import com.db.grad.javaapi.repository.SecuritiesRepository;
import java.util.*;  
import java.text.SimpleDateFormat;  
import org.springframework.http.ResponseEntity;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import javax.print.DocFlavor;
import java.net.URI;
import java.util.Map;
@RestController
@CrossOrigin
@RequestMapping("/api/v2")
public class SecuritiesController {
    @Autowired
    private SecuritiesRepository securitiesRepository;

    List < Securities > watchlist;
    HashSet<Long> set;
    Long id;

    public SecuritiesController(){
        watchlist=new ArrayList<Securities>();
        set=new HashSet();
        id=1L;
    }

    @GetMapping("/securities")
    public List < Securities > getAllSecurities() {
        List < Securities > secur = securitiesRepository.findAll();
        Collections.sort(secur, (Securities a1, Securities a2) -> a1.maturitydate.compareTo(a2.maturitydate));
        return secur;
    }
    
    // List < Securities >
    @CrossOrigin
    @GetMapping("/addtowatchlist/{id}")
    public List < Securities > addWatchlist(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
        
        if(!this.set.contains(id)){
            Securities securities = securitiesRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Security not found for id " + id));
        
        this.watchlist.add(securities);
        this.set.add(securities.id);

        }
         
        //return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:3000")).build();
        return this.watchlist;
    }

        @GetMapping("/watchlist")
    public List < Securities > getAllWatchlist() throws ResourceNotFoundException {
       
         

        return this.watchlist;
    }



  @GetMapping("/securities/{id}")
    public List < Securities > getSecuritiesById(@PathVariable(value = "id") Long id)
    throws ResourceNotFoundException {
      List < Securities > secur = securitiesRepository.findAll();
      List < Securities > result=new ArrayList<Securities>(); 
      for(int i=0;i<secur.size();i++){
        if(secur.get(i).id==id){
            result.add(secur.get(i));
            break;
        }

      }
            
            
        return result;
    }
    @GetMapping("/securities/{date1}/{date2}")
    public List < Securities > getSecuritiesByDateRange(@PathVariable(value = "date1")String date1,@PathVariable(value = "date2") String date2)
    throws ResourceNotFoundException,Exception {
        Date d1=new SimpleDateFormat("yyyy-MM-dd").parse(date1);
        Date d2=new SimpleDateFormat("yyyy-MM-dd").parse(date2);
        int c1,c2;
       List < Securities > secur = securitiesRepository.findAll();
       List < Securities > result=new ArrayList<Securities>();  
       for(int i=0;i<secur.size();i++){
       
        
        c1=d1.compareTo(secur.get(i).maturitydate); //<=0
        c2=d2.compareTo(secur.get(i).maturitydate); //>=0
        System.out.println("c1 = "+c1);
        System.out.println("c1 = "+c2);

        System.out.println("d1 = "+d1);
        System.out.println("d2 = "+d2);
        if(c1<=0 & c2>=0){
            System.out.println("working");
            result.add(secur.get(i));
            


        }

       }
        return result;
    }
     @GetMapping("/maturedsecurities")
    public List < Securities > getAllMaturedSecurities() {
        List < Securities > secur = securitiesRepository.findAll();
        List < Securities > result=new ArrayList<Securities>(); 
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");  
        Date date = new Date(); 

        System.out.println(date);

        int c1;
        for(int i=0;i<secur.size();i++){
       
        
        c1=date.compareTo(secur.get(i).maturitydate);
        if(c1>0){
            result.add(secur.get(i));

        }

        }  
        return result;
    }
  @PostMapping("/securities")
    public Securities createSecurities(@Valid @RequestBody Securities securities) {
        this.id = this.id+1;
        securities.id = this.id;
        return securitiesRepository.saveAndFlush(securities);
    }

    @PutMapping("/securities/{id}")
    public ResponseEntity < Securities > updateSecurity(@PathVariable(value = "id") Long id,
        @Valid @RequestBody Securities securityDetails) throws ResourceNotFoundException {
    	Securities getSecurities = securitiesRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("security not found for this id :: " + id));

    	getSecurities.setIsin(securityDetails.getIsin());
        getSecurities.setCusip(securityDetails.getCusip());
        getSecurities.setIssuer(securityDetails.getIssuer());
        getSecurities.setMaturitydate(securityDetails.getMaturitydate());
        getSecurities.setCoupon(securityDetails.getCoupon());
        getSecurities.setType(securityDetails.getType());
        getSecurities.setFacevalue(securityDetails.getFacevalue());
        getSecurities.setStatus(securityDetails.getStatus());
        

    	
        final Securities updatedSecurities = securitiesRepository.save(getSecurities);
        return ResponseEntity.ok(updatedSecurities);
    }

    @GetMapping("/deletesecurities/{id}")
    public Map < String, Boolean > deleteSecurity(@PathVariable(value = "id") Long id)
    throws Exception {
    	Securities security = securitiesRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Dog not found for this id :: " + id));

    	securitiesRepository.delete(security);
        Map < String, Boolean > response = new HashMap <>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
