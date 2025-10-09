import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function OrderSummary({ item }: { item: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 w-full md:w-[320px]">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Tóm tắt đơn hàng</h3>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-14 h-14 bg-gray-100 rounded-lg overflow-hidden">
          <Image src={item.image || "/placeholder.png"} alt={item.workflow || "Workflow thumbnail"} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{item.workflow || item.title}</h4>
          <p className="text-sm text-gray-700">{item.category}</p>
        </div>
      </div>

      <div className="text-sm border-t pt-2 space-y-2">
        <div className="flex justify-between text-gray-800">
          <span>Tạm tính</span>
          <span className="font-medium">${item.price}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t text-gray-900 text-base">
          <span>Tổng cộng</span>
          <span>${item.price}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0"/> 
          Thanh toán được mã hóa SSL
        </p>
        <p className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0"/> 
          Chính sách hoàn tiền 30 ngày
        </p>
        <p className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0"/> 
          Hỗ trợ 24/7
        </p>
      </div>
    </div>
  );
}


