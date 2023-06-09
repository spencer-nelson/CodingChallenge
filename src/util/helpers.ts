export let sanitizeFileNames = (files: any) => {
	let fileNames = files.map((a: any) => a.name)

	let trimmedFileNames = fileNames.map((file: any) => {
		let optimizedFileName: any = {}
		file = file.replace("ic_fluent_", "")
		file = file.replace(".svg", "")

		if (file.includes("regular")) optimizedFileName.style = "regular"
		if (file.includes("filled")) optimizedFileName.style = "filled"

		if (file.match(/\d+/)) {
			let sizestring: string = ""
			let matched: any

			if (optimizedFileName.style === "regular") {
				sizestring = file.match(/\d+_regular/)[0]
			} else {
				sizestring = file.match(/\d+_filled/)[0]
			}

			if (sizestring && sizestring.match(/\d+/)) {
				matched = sizestring.match(/\d+/)
				optimizedFileName.size = parseInt(matched[0])
			}
			// optimizedFileName.size = parseInt(file.match(/\d+/)[0])
		}
		file = file.replace(`${optimizedFileName.size}_regular`, "")
		file = file.replace(`${optimizedFileName.size}_filled`, "")

		// file = file.replace(/[0-9]/g, "")
		file = file.replace(/_/g, " ")
		file = file.trim()

		optimizedFileName.name = file

		file = file.replace(/_/g, " ")

		return optimizedFileName
	})

	return trimmedFileNames
}

export let addNewUpdated = (
	trimmedFileNames: any[],
	fileLocations: any[]
): any => {
	let finalReturnedObj: any = {}

	trimmedFileNames.map((tfilename: any, index) => {
		if (tfilename.status === "new") {
			let newName = tfilename.name + "_new"
			if (finalReturnedObj[newName]) {
				if (finalReturnedObj[newName][tfilename.size]) {
					finalReturnedObj[newName][tfilename.size].push({
						style: tfilename.style,
						urlPath: fileLocations[index],
					})
				} else {
					finalReturnedObj[newName][tfilename.size] = [
						{
							style: tfilename.style,
							urlPath: fileLocations[index],
						},
					]
				}
			} else {
				finalReturnedObj[newName] = {}
				finalReturnedObj[newName][tfilename.size] = [
					{ style: tfilename.style, urlPath: fileLocations[index] },
				]
			}
		} else {
			if (finalReturnedObj[tfilename.name]) {
				if (finalReturnedObj[tfilename.name][tfilename.size]) {
					finalReturnedObj[tfilename.name][tfilename.size].push({
						style: tfilename.style,
						urlPath: fileLocations[index],
						component: tfilename.component,
					})
				} else {
					finalReturnedObj[tfilename.name][tfilename.size] = [
						{
							style: tfilename.style,
							urlPath: fileLocations[index],
							component: tfilename.component,
						},
					]
				}
			} else {
				finalReturnedObj[tfilename.name] = {}
				finalReturnedObj[tfilename.name][tfilename.size] = [
					{
						style: tfilename.style,
						urlPath: fileLocations[index],
						component: tfilename.component,
					},
				]
			}
		}

		return 0
	})
	return finalReturnedObj
}
