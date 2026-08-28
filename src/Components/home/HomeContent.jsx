import React from 'react'

function HomeContent() {
  return (
    <div className="max-w-3xl mx-auto">
            
            <h2 className="text-3xl font-semibold text-[#4A352C]">
              Welcome to Muuv
            </h2>

            <p className="mt-2 text-[#8B6F61]">
              Discover what people are sharing.
            </p>

            <div className="mt-8">

              <div className="bg-white border border-[#D0B8A8] rounded-2xl p-5">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-[#D0B8A8] flex items-center justify-center text-[#4A352C] font-semibold">
                    G
                  </div>

                  <div>
                    <p className="font-semibold text-[#4A352C]">
                      Gaurav
                    </p>

                    <p className="text-xs text-[#8B6F61]">
                      Just now
                    </p>
                  </div>

                </div>

                <p className="mt-5 text-[#4A352C]">
                  Welcome to Muuv 👋
                </p>

              </div>

            </div>

          </div>
  )
}

export default HomeContent
