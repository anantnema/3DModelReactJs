import React, {Component} from 'react'
import * as THREE from 'three'
import * as OBJLoader from 'three-obj-loader';

OBJLoader(THREE);


var object;

class ThreeDModel extends Component {
    constructor(props) {
        super(props)
        this.animateObjects = []
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.animate = this.animate.bind(this)
    }

    componentDidMount() {
        const width = this.mount.clientWidth
        const height = this.mount.clientHeight

        var scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            45,
            width / height,
            1,
            2000
        )
        camera.position.z = 80;

        scene = new THREE.Scene();

        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        scene.add(camera);


        const renderer = new THREE.WebGLRenderer()



        const objValue = this.props.objValue;
        this.THREE = THREE;

        //var loader = new THREE.OBJLoader();
        var self = this
        //
        function loadModel() {

            if (!object) {
                return
            }
            object.traverse(function (child) {

                if (child.isMesh) child.material.map = texture;

            });
        }

        var manager = new THREE.LoadingManager();

        manager.onProgress = function (item, loaded, total) {

            console.log(item, loaded, total);

        };

        // // texture

        var textureLoader = new THREE.TextureLoader(manager);

        var texture = textureLoader.load('UV_Grid_Sm.jpg');

        // model

        function onProgress(xhr) {

            if (xhr.lengthComputable) {

                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');

            }

        }

        function onError(xhr) {
        }

        var loader = new this.THREE.OBJLoader();
        console.log(loader)

        loader.load('https://cors-anywhere.herokuapp.com/' + objValue, function (obj) {

            object = obj;

            obj.traverse(function (child) {

                if (child.isMesh) child.material.map = texture;

            });

            obj.position.y = -5;
            scene.add(obj);
            //console.log('Here')
            self.animateObjects.push(obj)

        }, onProgress, onError);


        renderer.setSize(500, 500);

        renderer.setClearColor('#000000')


        this.scene = scene
        this.camera = camera
        this.renderer = renderer

        this.mount.appendChild(this.renderer.domElement)
        this.start()
    }

    componentWillUnmount() {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    animate() {
        this.animateObjects.forEach(function (o) {
            o.rotation.y += 0.01
        })
        this.renderScene()
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{width: '500px', height: '500px'}}
                ref={(mount) => {
                    this.mount = mount
                }}
            />
        )
    }
}

export default ThreeDModel;
