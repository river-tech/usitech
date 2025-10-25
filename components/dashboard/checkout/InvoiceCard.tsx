  import { mockUserPurchases } from "../../../lib/mock-data";
  import { PurchaseStatus } from "../../../lib/types";

export default function InvoiceCard({ id }: { id: string }) {
  const purchase = mockUserPurchases.find((p) => p.id === id);

  if (!purchase) return <p className="text-center text-gray-700 text-lg">Invoice not found.</p>;

  // Generate invoice number (format: INV-YYYYMMDD-XXXX)
  const generateInvoiceNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `INV-${year}${month}${day}-${random}`;
  };

  const invoiceNumber = generateInvoiceNumber();
  const issuedAt = new Date().toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6 max-w-3xl mx-auto">
      {/* Invoice Header */}
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Hóa đơn bán hàng</h3>
          <p className="text-sm text-gray-600 mt-1">Invoice #{invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Ngày xuất: {issuedAt}</p>
          <p className="text-sm text-gray-600">Trạng thái: <span className={`font-medium ${purchase.status === PurchaseStatus.PENDING ? "text-yellow-600" : "text-green-600"}`}>
            {purchase.status === PurchaseStatus.PENDING ? "Chờ thanh toán" : "Đã thanh toán"}
          </span></p>
        </div>
      </div>

      {/* Billing Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Thông tin người mua</h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-black font-semibold">Tên:</span> <span className="font-medium text-gray-800">Nguyễn Văn A</span></p>
            <p><span className="text-black font-semibold">Email:</span> <span className="font-medium text-gray-800">nguyenvana@email.com</span></p>
            <p><span className="text-black font-semibold">Điện thoại:</span> <span className="font-medium text-gray-800">+84 123 456 789</span></p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Thông tin công ty</h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-black font-semibold">Công ty:</span> <span className="font-medium text-gray-800">UsITech Ltd.</span></p>
            <p><span className="text-black font-semibold">Email:</span> <span className="font-medium text-gray-800">support@usitech.io.vn</span></p>
            <p><span className="text-black font-semibold">Địa chỉ:</span> <span className="font-medium text-gray-800">123 Tech Street, HCMC</span></p>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Chi tiết sản phẩm</h4>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">Sản phẩm</span>
              <span className="font-medium text-gray-900">Giá</span>
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="font-medium text-gray-900">{purchase.workflow}</h5>
                <p className="text-sm text-gray-600">{purchase.category} • ID: {purchase.id}</p>
              </div>
              <span className="font-semibold text-gray-900">${purchase.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
          <span className="text-2xl font-bold text-gray-900">${purchase.price}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <p>Phương thức thanh toán: Chuyển khoản ngân hàng</p>
          <p>Trạng thái: <span className={`font-medium ${purchase.status === PurchaseStatus.Pending ? "text-yellow-600" : "text-green-600"}`}>
            {purchase.status === PurchaseStatus.PENDING ? "Chờ thanh toán" : "Đã thanh toán"}
          </span></p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t text-center">
        <p className="text-sm text-gray-600 mb-2">
          Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi!
        </p>
        <p className="text-sm text-gray-500">
          Cần hỗ trợ? Liên hệ: <span className="text-[#007BFF] font-medium">support@usitech.io.vn</span>
        </p>
      </div>
    </div>
  );
}


