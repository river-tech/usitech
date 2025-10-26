export default function WorkflowVideo({ url }: { url: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
      <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
        {/* Video placeholder with play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-white/30 transition-all duration-200 cursor-pointer">
              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <p className="text-lg font-medium">Watch Demo Video</p>
            <p className="text-sm opacity-80 mt-1">Click to play workflow demonstration</p>
          </div>
        </div>
        
        {/* Video element (hidden for now, would be shown when play is clicked) */}
        {
          url && (
            <video 
              controls 
              className="w-full h-full object-cover hidden"
              poster="/placeholder-video.jpg"
            >
              <source src={url || ""} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        }
        {/* <video 
          controls 
          className="w-full h-full object-cover hidden"
          poster="/placeholder-video.jpg"
        >
          <source src={url || ""} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
      </div>
      
      {/* Video info */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Demo Duration: 3:45</span>
          <span>Last Updated: Oct 2024</span>
        </div>
      </div>
    </div>
  );
}
