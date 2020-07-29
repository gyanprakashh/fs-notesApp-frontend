import React, { Component } from "react";
import axios from "axios";
import {Edit} from './Edit'
import './Notes.css'

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      data: [],
      editget:false,
      _id:'',
      title1:'',
      description1:''
    };
  }
  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  search = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/get-one`, {
        title: this.state.title,
      })
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          data: [...res.data.data],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  delete = (e, val) => {
    console.log(e + " " + val);
    axios
      .post(`http://localhost:5000/api/delete-item`, { _id: val })
      .then((res) => {
        const message = res.data.message;
        console.log(message);
        axios
        .post(`http://localhost:5000/api/get-one`, {
          title: this.state.title,
        })
        .then((res) => {
          console.log(res.data.data);
          this.setState({
            data: [...res.data.data],
          });
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  edit=(e,val,title1,description1)=>{
     console.log(e,val); 
     this.setState({
         _id:val,
         editget:true,
         title1:title1,
         description1:description1
     })

  }
  changeEdit=(e)=>{
    axios
    .post(`http://localhost:5000/api/get-one`, {
      title: this.state.title,
    })
    .then((res) => {
      console.log(res.data.data);
      this.setState({
        data: [...res.data.data],
        editget:false
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  render() {
    let obj;
    if (this.state.data.length>0  && !this.state.editget) {
      obj = this.state.data.map((result) => {
        return (
          <li className="list" key={result._id}>
            <p className='title'>
              {result.title}{" "}
              <span onClick={(e) => this.edit(e, result._id,result.title,result.description)}><img  style={{height:'1em', width:'1em'}} src="edit.png" alt="edit-icon"/></span>
              <span onClick={(e) => this.delete(e, result._id)}><img  style={{height:'1em', width:'1em'}} src="delete.png" alt='delete-icon'/></span>
            </p>
            <div className='description'>{result.description}</div>
          </li>
        );
      });
    }else{
        if(this.state.editget){
            obj= <Edit _id={this.state._id} title={this.state.title1} description={this.state.description1} settingState={this.changeEdit}/>
        }
   
    }
    return (
      <>
        <form className='form' onSubmit={this.search}>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            name="name"
          />
          <input type="submit" value="Search" />
        </form>
        {obj}
      </>
    );
  }
}

export default Search;
