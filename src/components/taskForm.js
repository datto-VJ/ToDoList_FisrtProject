import React, { Component } from 'react'

class TaskForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    onCloseForm = () => {
        this.props.onCloseForm()
    }
    onChange = (event) => {
        var target = event.target
        var name = target.name
        var value = target.value
        if (name === 'status') {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name]: value
        })

    }
    onSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.state)
        //Cancel and Close Form
        this.onClear();
        this.onCloseForm();
    }
    onClear = () => {
        this.setState({
            id:'',
            name: '',
            status: false
        })
    }
    componentWillMount() {
        var { taskEditing } = this.props
        console.log(taskEditing)
       if(this.props.taskEditing){
        this.setState({
            id:taskEditing.id, //THÊM THÌ KO CÓ ID, SỬA THÌ CÓ ID
            name: taskEditing.name,
            status: taskEditing.status
        })
       }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.taskEditing) {
            // var { taskEditing } = this.nextProps
            this.setState({
                id: nextProps.taskEditing.id, //THÊM THÌ KO CÓ ID, SỬA THÌ CÓ ID
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status
            })
        }else if(!nextProps.taskEditing){
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }
    render() {
        var {id} = this.state
        console.log(id)
        return (
            <div>
                <div>
                    <div className="d-flex bg-primary text-light">
                        <h4 className="mr-auto m-2">{id !== ''?'UPDATING':'TO-DO'}</h4>
                        <span className="m-2" onClick={this.onCloseForm}><i className="fa fa-window-close" /></span>
                    </div>
                    <form className="border mt-2" onSubmit={this.onSubmit}>
                        <div className="form-group m-2">
                            <label htmlFor="name">Let's do it</label>
                            <input type="text" className="form-control" name="name" placeholder="Do something..." value={this.state.name} onChange={this.onChange} />
                            <small className="form-text text-muted">What do you want to do with your life .</small>
                        </div>
                        <div className="form-group m-2">
                            <label htmlFor="status">Status</label>
                            <select className="custom-select" name="status" value={this.state.status} onChange={this.onChange}>
                                <option value={true}>Ưu tiên</option>
                                <option value={false}>Đang chuẩn bị</option>
                            </select>
                            <small className="form-text text-muted">Chọn trạng thái công việc.</small>
                        </div>
                        <button type="submit" className="btn btn-primary m-2"><i className="fa fa-save" /> Lưu lại</button>
                        <button type="button" className="btn btn-primary m-2" onClick={this.onClear}><i className="fa fa-window-close" /> Làm mới</button>
                    </form>
                </div>

            </div>
        );
    }
}

export default TaskForm;
