import React from "react"; 

class FileUpload extends React.Component{

    constructor(props){
        super(props); 

        this.state = {
            fileImage:'',
            fileName:''
        }
    }

    handleOnChange = (e) =>{
        //get files
        let _files = e.target.files;  

        console.log(_files);

        for (let i = 0; i < _files.length; i++) {
            const file = _files[i];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>{

            let fileInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result,
                file: file,
            };
            this.setState({fileImage: fileInfo.base64, fileName: fileInfo.name})
            this.props.onDone(fileInfo); 
            }
        }

    }

    render(){
        return(
            <div>
                <img src={this.state.fileImage} className="card-img-top" alt="..." />
            <div className="custom-file">
                <input type="file" className="custom-file-input"  lang="es" 
                    onChange={this.handleOnChange.bind(this)}
                    />
                <label className="custom-file-label" >{ this.state.fileName ? this.state.fileName : "Choose file"} </label>
            </div>
            </div>
        ); 
    }

}

export default FileUpload; 