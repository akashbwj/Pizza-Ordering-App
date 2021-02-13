const Order=require('../../../models/order');

function statusController(){
    return{
        update(req, res){
            Order.updateOne({_id: req.body.orderId},{status:req.body.status},(err,updatedData)=>{
                if(err){
                    return res.redirect('/admin/orders')
                }
                //Emit event when status gets updated
                const eventEmitter=req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated',{id: req.body.orderId,status:req.body.status})
                return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports=statusController