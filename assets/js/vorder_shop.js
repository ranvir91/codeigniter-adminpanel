	$(document).ready(function(){
            $('#detail_cart').load(base_url+'product/load_cart');
		$('.add_cart').click(function(){
			
            
			var product_id          = $(this).data("productid");
			var product_name        = $(this).data("productname");
			var product_price       = $(this).data("productprice");
            var product_gst         = $(this).data("productgst");
            var image_name          = $(this).data("imagename");
			var quantity            = $('#' + product_id).val();
            var moq                 = $(this).data("moq");
			
			$.ajax({
				url : base_url+"product/add_to_cart",
				method : "POST",
				data : {product_id: product_id, moq:moq,imagename:image_name,product_name: product_name,productgst:product_gst, product_price: product_price, quantity: quantity},
				success: function(data){
					$('#detail_cart').html(data);
				}
			});
		});

		
		

		
		$(document).on('click','.romove_cart',function(){
			var row_id=$(this).attr("id"); 
			$.ajax({
				url : base_url+"product/delete_cart",
				method : "POST",
				data : {row_id : row_id},
				success :function(data){
					$('#detail_cart').html(data);
				}
			});
		});
	});