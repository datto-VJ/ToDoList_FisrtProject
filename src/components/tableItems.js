import React, { Component } from 'react'

class TaskItem extends Component {
    constructor(props){
        super(props)
    }
    onUpdatedStatus=()=>{
        this.props.onUpdatedStatus(this.props.task.id)
    }
    onDelete=()=>{
        this.props.onDelete(this.props.task.id)
    }
    onUpdate=()=>{
        this.props.onUpdate(this.props.task.id)
    }
    render() {
        var {task,index} = this.props;
        return (
                    <tr>
                        <td scope="row">{index+1}</td>
                        <td>{task.name}</td>
                        <td>
                            <span className={task.status?' btn btn-danger':'btn btn-success'} onClick={this.onUpdatedStatus}>{task.status?'Ưu tiên':'Đang chuẩn bị'}</span>
                        </td>
                        <td>
                            <button type="submit" className="btn btn-primary m-2" onClick={this.onUpdate}><i className="fa fa-edit" /> Sửa</button>
                            <button type="submit" className="btn btn-primary m-2" onClick={this.onDelete}><i className="fa fa-window-close" /> Hủy bỏ</button>
                        </td>
                    </tr>
        );
    }
}

export default TaskItem;
