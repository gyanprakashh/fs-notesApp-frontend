import React, { Component } from "react";
import axios from "axios";
import "./Notes.css";
import { Edit } from "./Edit";

export class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initial: [],
      read: false,
      editget: false,
      _id: "",
      title1: "",
      description1: "",
      message:''
    };
  }
  componentDidMount = () => {
    axios
      .get(`http://localhost:5000/api/get-all`)
      .then((res) => {
        const persons = res.data.data;
        // console.log(persons);
        this.setState({ initial: [...persons] });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  description = (event) => {
    console.log(event.target.className);
    if (!this.state.read) {
      event.target.className = "hide";
    } else {
      event.target.className = "description";
    }
    this.setState({
      read: !this.state.read,
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
      .get(`http://localhost:5000/api/get-all`)
      .then((res) => {
        const persons = res.data.data;
        // console.log(persons);
        this.setState({ initial: [...persons] });
      })
      .catch((err) => {
        console.log(err);
      });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  edit = (e, val, title1, description1) => {
    console.log(e, val);
    this.setState({
      _id: val,
      editget: true,
      title1: title1,
      description1: description1,
    }); 
    
  };
  changeEdit = (e) => {
    axios
    .get(`http://localhost:5000/api/get-all`)
    .then((res) => {
      const persons = res.data.data;
      // console.log(persons);
      this.setState({ initial: [...persons] ,editget:false});
    })
    .catch((err) => {
      console.log(err);
    });
   /* this.setState({
      editget: false,
    });*/
  };
  render() {
    let obj;
    if (this.state.initial.length > 0 && !this.state.editget) {
      obj = this.state.initial.map((data) => {
        return (
          <li className="list" key={data._id}>
            {" "}
            <p className="title">
              {data.title}{" "}
              <span
                onClick={(e) =>
                  this.edit(e, data._id, data.title, data.description)
                }
              >
                <img  style={{height:'1em', width:'1em'}} src="edit.png" alt='edit-icon' />
              </span>{" "}
              <span onClick={(e) => this.delete(e, data._id)}><img  style={{height:'1em', width:'1em'}} src="delete.png" alt='delete-icon'/></span>
            </p>
            <div className="description" onClick={this.description}>
              {data.description}
            </div>
          </li>
        );
      });
    } else {
      if (this.state.editget) {
        obj = (
          <Edit
            _id={this.state._id}
            title={this.state.title1}
            description={this.state.description1}
            settingState={this.changeEdit}
          />
        );
      }
    }
    return <>{obj}</>;
  }
}

export default Notes;
