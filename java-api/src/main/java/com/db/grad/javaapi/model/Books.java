package com.db.grad.javaapi.model;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "books")
public class Books {
	@Id
	private long id;
	@Column(name = "bookname", nullable = false)
    private String bookname;
    
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "books")
    private List<Books> books;

    public Books() {

    }

    public Books(long id, String bookname) {
    	this.id=id;
        this.bookname = bookname;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }    
    
	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}
    

}