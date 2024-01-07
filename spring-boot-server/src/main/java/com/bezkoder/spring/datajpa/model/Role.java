package com.bezkoder.spring.datajpa.model;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
@Builder
@AllArgsConstructor
public class Role implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Enumerated(EnumType.STRING)
	@Column(length = 100)
	private ERole name;
	public Role() {
	}
	public Role(ERole name) {
		this.name = name;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public ERole getName() {
		return name;
	}
	public void setName(ERole name) {
		this.name = name;
	}
}
