  export default function WorkflowVideo({ url }: { url: string }) {
    if (!url) {
      return (
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white flex flex-col items-center justify-center py-10 mb-4">
          <p className="text-gray-500 text-lg font-semibold">No video demo found</p>
        </div>
      );
    }
    return (
      <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
        <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
          <video 
            controls 
            className="w-full h-full object-contain bg-black"
            poster="/placeholder-video.jpg"
            src={url}
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Video info */}
       
      </div>
    );
  }
