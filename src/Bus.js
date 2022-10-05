class Bus {
    constructor(){
        this.channels = {}
    }

    subscribe(msg, cb){
        if(this.channels[msg]){
            this.channels[msg].push(cb);
        }
        else{
            this.channels[msg] = [cb]
        }
    }

    publish(msg, payload){
        if(this.channels[msg]){
            this.channels[msg].forEach(cb => cb(payload));
        }
    }
}

export default new Bus()