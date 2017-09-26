import pymongo

class DataBase(object):
	"""docstring for DataBase"""
	def __init__(self, host_id = '127.0.0.1', port_id = 27017):
		super(DataBase, self).__init__()
		self.con = pymongo.MongoClient(host_id, port_id)

	def get_database(self, db_name):
		self.db  = self.con[db_name]
		return self.db

	def search_item(self, query_dic):
		result = []
		for item in self.db.col.find(query_dic):
			result.append(item)

		return result
'''
The test code for query item in database.
'''

'''
if __name__ == '__main__':
	db = DataBase()
	print db.get_database('BioPA').name
	db.search_item({'PathID': 'pid_4796'})
'''

