import React, { Component } from 'react'
import './App.css';
import TaskForm from './components/taskForm'
import TaskControl from './components/control'
import TaskTable from './components/table'
var randomstring = require("randomstring");

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [], //id:id, name:name, status:status
      isDisplayForm: false,
      taskEditing:null,
      filter:{
        name:'',
        status:-1
      },
      keyWord:'',
      sortBy:'name',
      sortValue:1
    }
  }
  // onGenerateData=()=>{
  //   var tasks = [
  //     {
  //       id:randomstring.generate(),
  //       name:'Học ReactJS',
  //       status: true
  //     },
  //     {
  //       id:randomstring.generate(),
  //       name:'Học ExpressJS',
  //       status: false
  //     },
  //     {
  //       id:randomstring.generate(),
  //       name:'Học NodeJS',
  //       status: true
  //     }
  //   ]
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }
  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'))
      this.setState({
        tasks: tasks
      })
    }
  }
  onToggleForm = () => {
    if(this.state.isDisplayForm && this.state.taskEditing!==null){
      this.setState({
        isDisplayForm: true,
        taskEditing:null
      })
    }else{
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing:null
      })
    }
    
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    })
  }
  onSubmit = (data) => {
    // PHÂN BIỆT KHI NÀO THÊM KHI NÀO SỬA
    var { tasks } = this.state
    if(data.id===''){
      data.id = randomstring.generate()
      tasks.push(data)
    }else{
      //Editing
      let index = this.findIndex(data.id)
      tasks[index]=data
    }
    
    this.setState({
      tasks: tasks,
      taskEditing:null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  onUpdatedStatus = (id) => {
    var { tasks } = this.state
    let index = this.findIndex(id)
    if (index !== -1) {
      tasks[index].status = !tasks[index].status
      this.setState({
        tasks: tasks
      })
    }
  }
  findIndex = (id) => {
    var { tasks } = this.state
    var result = -1
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index
        return result

      }
    })
    return result
  }
  onDelete = (id) => {
    var { tasks } = this.state
    let index = this.findIndex(id)
    if (index !== -1) {
      tasks.splice(index, 1)
      this.setState({
        tasks: tasks
      })
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    this.onCloseForm()
  }
  onUpdate = (id) => {
    var {tasks}= this.state
    let index = this.findIndex(id)
    var taskEditing = tasks[index]
    // var editing = tasks.filter(task=>task.id===id)
    this.setState({
      taskEditing:taskEditing,
      isDisplayForm:true
    })
  }
  onFilter=(filterName,filterStatus)=>{
    // console.log(`filterName:${filterName} ; filterStatus:${filterStatus}`)
    filterStatus = parseInt(filterStatus)
    this.setState({
      filter:{
        name:filterName.toLowerCase(),
        status:filterStatus
      }
    })
  }
  onSearch=(keyWord)=>{
    this.setState({
      keyWord:keyWord
    })
  }
  onSort=(sortBy,sortValue)=>{
    // console.log(`sortBy: ${sortBy} - sortValue:${sortValue}`)
    this.setState({
      sortBy:sortBy,
      sortValue:sortValue
    })
  }
  render() {
    var { tasks, isDisplayForm, taskEditing , filter, keyWord, sortBy, sortValue} = this.state
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filter.name) !== -1 
        })
      }
      tasks = tasks.filter((task)=>{
        if(filter.status===-1){
          return tasks
        }else{
          return task.status === (filter.status===1?false:true)
        }
      })
    }
    if(keyWord){
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyWord) !== -1 
      })
    }
    if(sortBy==='name'){
      tasks.sort((a,b)=>{
        if(a.name>b.name) return sortValue
        else if(a.name < b.name) return -sortValue
        else return 0
      })
    }else{
      tasks.sort((a,b)=>{
        if(a.status>b.status) return -sortValue
        else if(a.status < b.status) return sortValue
        else return 0
      })
    }
    // var eleForm = isDisplayForm?
    return (
      <div className="container-fluid" >
        <h1>TO DO LIST APPLICATION</h1>
        <div className="row">
          <div className={isDisplayForm ? 'col-4' : ''}>
            {/* Bảng thêm công việc */}
            {isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} taskEditing={taskEditing}></TaskForm> : ''}
          </div>
          <div className={isDisplayForm ? 'col-8' : 'col-12'}>
            <button className="btn btn-primary mb-2 ml-3" onClick={this.onToggleForm}>Thêm công việc</button>
            {/* <button className="btn btn-primary mb-2 ml-3" onClick={this.onGenerateData}>Dữ liệu gốc</button> */}
            {/* Thanh search và sort */}
            <TaskControl onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}></TaskControl>
            {/* Danh sách công việc */}
            <TaskTable tasks={tasks} onUpdatedStatus={this.onUpdatedStatus} onDelete={this.onDelete} onUpdate={this.onUpdate} onFilter = {this.onFilter}></TaskTable>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
