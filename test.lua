corners =  {5, 59, 5, 49, 12, 49, 12, 24, 25, 24, 25, 40, 35, 40, 35, 0}
path = ""

function PathAlgorithm(index)
	if #corners ~= index+4 then
		difference = corners[index+1] - corners[index+3] - 1
		print("DIFFERENCE: " .. difference)
		if index%2 == 1 and difference > 0 then
			x = corners[index+1]
			y = corners[index]
			--print(x,y,difference)
				for i=1, difference do
					x = x - 1
					path = path .. "grid[" .. y .. "][" .. x .. "], "
				end
		end
		if index%2 == 1 and difference < 0 then
			x = corners[index+1]
			y = corners[index]
			--print(x,y,difference)
				for i=1, difference do
					x = x + 1
					path = path .. "grid[" .. y .. "][" .. x .. "], "
				end
		end
		if index%2 == 0 and difference > 0 then
			x = corners[index]
			y = corners[index+1]
			for i=1, difference do
				y = y - 1
					path = path .. "grid[" .. y .. "][" .. x .. "], "
			end
		end
		if index%2 == 0 and difference < 0 then
			x = corners[index]
			y = corners[index+1]
			for i=1, difference do
				y = y + 1
					path = path .. "grid[" .. y .. "][" .. x .. "], "
			end
		end
	end
end
counter = 1
for i = 1, #corners do
	path = path .. "grid[" .. corners[counter] .. "][" .. corners[counter+1] .. "], "
	PathAlgorithm(counter) 
	counter = counter + 2
end

print (path)
--[[
y = 0
x = 0
i = 0
start = 0
difference = 0
path = ""

function PathAlgorithm (index)
	if #corners == index+2 then
		difference = corners[index] - corners[i+2] - 1
		start = corners[index]
		if index%2 == 1 then
			x = corners[index]
			y = start
				for i=1, difference do
					x = x - 1
					path = path .. "grid[" .. y .. "][" .. x .. "], "
				end			
		end
	end
end

for i=1, #corners do 
	path = "grid[" .. corners[i] .. "][" .. corners[i+1] .. "], "
	PathAlgorithm(i)
end

print(path)

--for i, v in ipairs(corners) do print(v) end
]]--
