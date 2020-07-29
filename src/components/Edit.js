import React, { Component } from "react";
import axios from 'axios';
import  { Redirect } from 'react-router-dom'


export class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      description: this.props.description,
      _id:this.props._id
    };
  }
handleChange=(e)=>{
    if(e.target.name==='title'){
        this.setState({
            title:e.target.value
        })
    }else{
        this.setState({
            description:e.target.value
        })
    }
   
}
addSubmit=(e)=>{
   e.preventDefault();
const {title,description,_id}=this.state
   axios.post(`http://localhost:5000/api/update-item`,{
        _id:_id,
        title:title,
        description:description
   }).then((res)=>{
       console.log(res.data.message);
       console.log(res.data);
       this.props.settingState();
   }).catch(err=>{
       console.log(err);
   })
}
  render() {
    return (
      <>
        <form name="formadd" onSubmit={this.addSubmit}>
          <label>
            <br />
            <p>Title</p>
            <input
              type="text"
              placeholder="add title"
              value={this.state.title}
              onChange={this.handleChange}
              name="title"
            />
          </label>
          <br />
          <label>
            <p>description</p>
            <textarea
              rows="15"
              cols="40"
              placeholder="add description"
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default Edit;
