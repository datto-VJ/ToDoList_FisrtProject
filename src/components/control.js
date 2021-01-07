import React, { Component } from 'react'

class TaskControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyWord: ''//,
            // sort:{
            //     by:'name',
            //     value:1
            // }
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
    onChange = (event) => {
        var target = event.target
        var name = target.name
        var value = target.value
        this.setState({
            [name]: value
        })
    }
    onSearch = (event) => {
        event.preventDefault()
        console.log(this.state)
        this.props.onSearch(this.state.keyWord)
    }
    onClick=(sortBy,sortValue)=>{
        // console.log(`sortBy: ${sortBy} ; sortValue : ${sortValue}`)
        // this.setState({
        //    sort:{
        //     by:sortBy,
        //     value:sortValue
        //    }
        // })
        this.props.onSort(sortBy,sortValue)
    }
    render() {
        var { keyWord} = this.state //sort
        var {sortBy,sortValue} = this.props
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-9">
                        <form className=" my-2 my-lg-0 d-flex outline-primary">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="keyWord" value={keyWord} onChange={this.onChange} />
                            <button className="btn btn-outline-primary my-2 my-sm-0 m-2" type="submit" onClick={this.onSearch}>Search</button>

                        </form>
                    </div>
                    <div className="col-3">
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sắp xếp
                                </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {/* {(sort.by==='name' && sort.value===1)?"fa fa-check":""} */}
                                <a className="dropdown-item" onClick={()=>{this.onClick('name',1)}}>Tên A to Z <i className={(sortBy==='name' && sortValue===1)?"fa fa-check":""}></i></a> 
                                <a className="dropdown-item" onClick={()=>{this.onClick('name',-1)}}>Tên Z to A <i className={(sortBy==='name' && sortValue===-1)?"fa fa-check":""}></i></a>
                                <hr></hr>
                                <a className="dropdown-item" onClick={()=>{this.onClick('status',1)}}>Trạng thái : <span className="text-danger">Ưu tiên </span><i className={(sortBy==='status' && sortValue===1)?"fa fa-check":""}></i></a>
                                <a className="dropdown-item" onClick={()=>{this.onClick('status',-1)}}>Trạng thái : <span className="text-success">Đang chuẩn bị </span><i className={(sortBy==='status' && sortValue===-1)?"fa fa-check":""}></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskControl;
