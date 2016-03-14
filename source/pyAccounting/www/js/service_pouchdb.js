angular.module('service_pouchdb', [])

  //========== 主数据库 ==========
  // 主key: MASTER_ID
  // 排序: MASTER_ORDER
  //================================
  .service('masterService', function ($q) {
    var _db;

    return {
      // 初始化数据库
      initDB: function () {
        // Creates the database or opens if it already exists
        _db = new PouchDB('devices', {adapter: 'websql', auto_compaction: true});
      },

      // 删除数据库
      dropDB: function () {
        return $q.when(_db.destroy())
          .then(function (response) {
            // success
            return response;
          })
          .catch(function (err) {
            console.log(err);
          });
      },

      // 返回所有数据
      getAllDevices: function () {
        return $q.when(_db.allDocs({include_docs: true}))
          .then(function (docs) {
            // return docs;
            return docs.rows.map(function (row) {
              return row.doc;
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      },

      // 插入多条数据
      addMasters: function (masters) {
        return $q.when(_db.bulkDocs(masters));
      },

      // 根据ID查询数据
      getMasterById: function (masterId) {
        // 查询数据时用的比较函数
        function query_map(doc, emit) {
          if (doc.MASTER_ID === masterId) {
            // 排序
            emit([doc.MASTER_ID, doc.MASTER_ORDER]);
          }
        }

        return $q.when(_db.query(query_map, {include_docs: true})
          .then(function (docs) {
            // handle result
            return docs.rows.map(function (row) {
              return row.doc;
            });
          })
          .catch(function (err) {
            console.log(err);
          }));
      },

      // 根据ID删除数据
      deleteMasterById: function (masterId) {
        // 查询数据时用的比较函数
        function query_map(doc, emit) {
          if (doc.MASTER_ID === masterId) {
            // 排序
            emit([doc.MASTER_ID, doc.MASTER_ORDER]);
          }
        }

        return $q.when(_db.query(query_map, {include_docs: true})
          .then(function (docs) {
            // handle result
            return $q.all(docs.rows.map(function (row) {
              return _db.remove(row.doc);
            }));
          })
          .catch(function (err) {
            console.log(err);
          }));
      },

      // 更新数据
      updateMaster: function (master_row) {
        return $q.when(_db.put(master_row));
      },

      // 删除数据
      deleteMaster: function (master_row) {
        return $q.when(_db.remove(master_row));
      }
    }
  })

  //========== 详细数据库 ==========
  // 主key: MASTER_ID,DETAIL_ID
  // 排序: DETAIL_ORDER
  //================================
  .service('detailService', function ($q) {
    var _db;

    return {
      // 初始化数据库
      initDB: function () {
        // Creates the database or opens if it already exists
        _db = new PouchDB('details', {adapter: 'websql', auto_compaction: true});
      },

      // 删除数据库
      dropDB: function () {
        return $q.when(_db.destroy())
          .then(function (response) {
            // success
            return response;
          })
          .catch(function (err) {
            console.log(err);
          });
      },

      // 插入多条数据
      addDetails: function (details) {
        return $q.when(_db.bulkDocs(details));
      },

      // 根据主ID查询数据
      getMasterById: function (masterId) {
        // 查询数据时用的比较函数
        function query_map(doc, emit) {
          if (doc.MASTER_ID === masterId) {
            // 排序
            emit([doc.MASTER_ID, doc.DETAIL_ORDER]);
          }
        }

        return $q.when(_db.query(query_map, {include_docs: true})
          .then(function (docs) {
            // handle result
            return docs.rows.map(function (row) {
              return row.doc;
            });
          })
          .catch(function (err) {
            console.log(err);
          }));
      },

      // 根据主ID删除数据
      deleteMasterById: function (masterId) {
        // 查询数据时用的比较函数
        function query_map(doc, emit) {
          if (doc.MASTER_ID === masterId) {
            // 排序
            emit([doc.MASTER_ID, doc.DETAIL_ORDER]);
          }
        }

        return $q.when(_db.query(query_map, {include_docs: true})
          .then(function (docs) {
            // handle result
            return $q.all(docs.rows.map(function (row) {
              return _db.remove(row.doc);
            }));
          })
          .catch(function (err) {
            console.log(err);
          }));
      },

      // 更新数据
      updateDetail: function (detail_row) {
        return $q.when(_db.put(detail_row));
      },

      // 删除数据
      deleteDetail: function (detail_row) {
        return $q.when(_db.remove(detail_row));
      }
    }
  });




