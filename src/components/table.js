import React, { Component } from 'react'
import TaskItem from './tableItems'
class TaskTable extends Component {
    constructor(props){
        super(props)
        this.state={
            filterName:'',
            filterStatus:-1 //all: -1, ưu tiên :0, đang chuẩn bị : 1
        }
    }
    onChange=(event)=>{
        var target = event.target
        var name = target.name
        var value = target.value
        this.props.onFilter(name==='filterName'?value:this.state.filterName, name==='filterStatus'?value:this.state.filterStatus)
        this.setState({
            [name]: value
        })

    }
    render() {
        var {filterName,filterStatus}=this.state
        var {tasks} = this.props
        var elements = tasks.map((task,index)=>{
            return  <TaskItem task={task} index={index} key={index} onUpdatedStatus={this.props.onUpdatedStatus} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate}></TaskItem>
        })
        return (
            <table className="table m-2">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Công việc</th>
                        <th>Trạng thái
                            
                        </th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row"></td>
                        <td>
                            <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange}/>
                        </td>
                        <td>
                            <select className="custom-select" name="filterStatus" value={filterStatus} onChange={this.onChange}>
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ưu tiên</option>
                                <option value={1}>Đang chuẩn bị</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }
}

export default TaskTable;
