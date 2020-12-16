function cartController(){
    return {
        index(req,res){
            res.render('customers/cart');
        },
        update(req,res){
            /*
            "cart's structure"
            cart={
                items:{
                    pizzaId: {item: pizzaObject, qty=0},
                },
                totalQty:0,
                totalPrice:0
            }
            */
           //when adding first pizza, create the cart structure first
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
            }
            let cart=req.session.cart

            //check if item does not exist in the cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item:req.body,
                    qty:1
                }
                cart.totalQty=cart.totalQty+1;
                cart.totalPrice=cart.totalPrice+req.body.price;
            } else {
                cart.items[req.body._id].qty=cart.items[req.body._id].qty+1;
                cart.totalQty=cart.totalQty+1;
                cart.totalPrice=cart.totalPrice+req.body.price;
            }
            return res.json({totalQty:req.session.cart.totalQty})
        }
    }
}
module.exports=cartController;