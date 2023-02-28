import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imgUrl:'',
      box: {},
      route: 'signin',
    }
  }


calculateFaceLocation = (data) => {
  console.log(data);
  var clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  console.log(height, width);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}


displayFaceBox = (box) => {
  this.setState({box: box});
}


  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState( {imgUrl: event.target.value});
  }


  onSubmit = () => {
    console.log('click');
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'c0a86033734d40b3b7da75f8095c7452';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'elvio_corona';       
    const APP_ID = 'my-first-application';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';    
    const IMAGE_URL = this.state.imgUrl;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));
  }


  onRouteChange = (route) => {
    this.setState({ route: route });
  }

render(){
  return (
    <div className="App">
     
      <Navigation onRouteChange={this.onRouteChange} />
      <Logo />
      {this.state.route === 'home'?
          <div>
            <Rank />
            <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
            <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
          </div>
          :(
            this.state.route === 'signin'?
            <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
            )
  }
  </div>
  );
 }
}

export default App;
