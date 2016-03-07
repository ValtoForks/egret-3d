﻿module egret3d_dev {
                
    /**
    * @class egret3d_dev.Mesh
    * @classdesc
    * 3d模型网格 生成渲染模型
    * 创建一个Mesh网格数据和材质数据是必需的，如果是动态模型就加上动画数据
    * 继承Object3D对象，场景中实体渲染对象
    *
    * @see egret3d_dev.Object3D
    * @see egret3d_dev.GeometryBase
    * @see egret3d_dev.MaterialBase
    * @see egret3d_dev.IAnimation
    *
    * 示例:
    * @includeExample core/node/Mesh.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Mesh extends Object3D implements IRender{

        public subMaterials: { [matID: number]: MaterialBase };

        public geometry: Geometry;
        public material: MaterialBase;

        public pickType: number;
        public bound: Bound;

        /**
        * @language zh_CN
        * 构建一个Mesh对象
        * @param geometry 模型数据
        * @param material 模型材质
        * @param animation 模型动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(geometry: Geometry, material: MaterialBase) {
            super();

            this.geometry = geometry;
            this.material = material;
        }

        // /**
        //* @language zh_CN
        //* 设置模型中的geometry
        //* @param geo 为mesh设置一个顶点模型 geometry
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public set geometry(geo: Geometry) {
        //    if (this.geometry && this.geometry == geo)
        //        geo.init();
        //}

        // /**
        //* @language zh_CN
        //* 返回模型中的geometry
        //* @returns 模型中的geometry
        //* @version Egret 3.0
        //* @platform Web,Native
        //*/
        //public get geometry(): Geometry {
        //    return this.geometry; 
        //}

        public init() {
            if (this.geometry)
                this.geometry.init();
        }

        /**
        * @language zh_CN
        * 克隆一个模型
        * @returns 克隆后的模型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Mesh {
            return new Mesh(this.geometry, this.material );
        }
                                
        /**
        * @language zh_CN
        * 当前对象数据更新，只有在视锥内的对象才会执行此更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(time: number, delay: number, camera: Camera3D) {

            if (this.isDisable)
                return;

            if (this.animation) {
                //this.animation.updata(time, delay);
            }
        }

        /**
        * @language zh_CN
        * 生成包围盒
        */
        //private buildBoundBox() {
        //    this.box.min.copyFrom(new Vector3D(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE));
        //    this.box.max.copyFrom(new Vector3D(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE));
        //    for (var i: number = 0; i < this.geometry.verticesData.length; i += this.geometry.vertexAttLength) {
        //        if (this.box.max.x < this.geometry.verticesData[i]) {
        //            this.box.max.x = this.geometry.verticesData[i];
        //        }
        //        if (this.box.max.y < this.geometry.verticesData[i + 1]) {
        //            this.box.max.y = this.geometry.verticesData[i + 1];
        //        }
        //        if (this.box.max.z < this.geometry.verticesData[i + 2]) {
        //            this.box.max.z = this.geometry.verticesData[i + 2];
        //        }

        //        if (this.box.min.x > this.geometry.verticesData[i]) {
        //            this.box.min.x = this.geometry.verticesData[i];
        //        }
        //        if (this.box.min.y > this.geometry.verticesData[i + 1]) {
        //            this.box.min.y = this.geometry.verticesData[i + 1];
        //        }
        //        if (this.box.min.z > this.geometry.verticesData[i + 2]) {
        //            this.box.min.z = this.geometry.verticesData[i + 2];
        //        }
        //    }

        //    this.box.fillBox(this.box.min, this.box.max);
        //}

        public upload(context3DProxy: Context3DProxy) {
            //to add index buffer
            //to add vertex buffer

            this.geometry.sharedIndexBuffer = context3DProxy.creatIndexBuffer(this.geometry.indexData);
            this.geometry.sharedVertexBuffer = context3DProxy.creatVertexBuffer(this.geometry.verticesData);
        }

        private _i: number; 
        private _subGeometry: SubGeometry;
        private _matID: number; 
        public renderDiffusePass(time: number, delay: number, context3DProxy: Context3DProxy, camera3D: Camera3D) {
            this._i = 0;
            this.geometry.update(time, delay,context3DProxy, camera3D);
            for (this._i = 0; this._i < this.geometry.subGeometrys.length; this._i++) {
                this._subGeometry = this.geometry.subGeometrys[this._i];
                this._matID = this._subGeometry.matID;
                this.subMaterials[this._matID].renderDiffusePass(time, delay, context3DProxy, this.modelMatrix, camera3D, this._subGeometry, this.animation);
              
            }

           
            
        }
    }
} 