/**
 *
 * @author 半城风雨
 * @since 2021/11/13
 * @File : city
 */
package service

import (
	"easygoadmin/app/dto"
	"easygoadmin/app/model"
	"easygoadmin/app/vo"
	"easygoadmin/utils"
	"easygoadmin/utils/gconv"
	"errors"
	"strings"
	"time"
)

var City = new(cityService)

type cityService struct{}

func (s *cityService) GetList(req *dto.CityQueryReq) []vo.CityInfoVo {
	// 创建查询对象
	query := utils.XormDb.Where("mark=1")
	// 查询条件
	if req != nil {
		// 上级ID
		query = query.Where("pid=?", req.Pid)
		// 城市名称
		if req.Name != "" {
			query = query.Where("name like ?", "%"+req.Name+"%")
		}
	}
	// 排序
	query = query.OrderBy("sort asc")
	// 对象转换
	var list []model.City
	query.FindAndCount(&list)

	// 数据解析
	var result = make([]vo.CityInfoVo, 0)
	// 遍历数据
	for _, v := range list {
		item := vo.CityInfoVo{}
		item.City = v
		if v.Level < 3 {
			item.HaveChild = true
		} else {
			item.HaveChild = false
		}
		result = append(result, item)
	}
	return result
}

func (s *cityService) Add(req *dto.CityAddReq, userId int) (int64, error) {
	// 实例化对象
	var entity model.City
	entity.Name = req.Name
	entity.Pid = req.Pid
	entity.Level = req.Level
	entity.Citycode = req.Citycode
	entity.PAdcode = req.PAdcode
	entity.Adcode = req.Adcode
	entity.Lng = req.Lng
	entity.Lat = req.Lat
	entity.Sort = req.Sort
	entity.CreateUser = userId
	entity.CreateTime = time.Now()
	entity.Mark = 1

	// 插入记录
	return entity.Insert()
}

func (s *cityService) Update(req *dto.CityUpdateReq, userId int) (int64, error) {
	// 查询记录
	entity := &model.City{Id: req.Id}
	has, err := entity.Get()
	if err != nil || !has {
		return 0, err
	}

	// 设置对象属性
	entity.Name = req.Name
	entity.Pid = req.Pid
	entity.Level = req.Level
	entity.Citycode = req.Citycode
	entity.PAdcode = req.PAdcode
	entity.Adcode = req.Adcode
	entity.Lng = req.Lng
	entity.Lat = req.Lat
	entity.Sort = req.Sort
	entity.UpdateUser = userId
	entity.UpdateTime = time.Now()

	// 更新记录
	return entity.Update()
}

func (s *cityService) Delete(ids string) (int64, error) {
	// 记录ID
	idsArr := strings.Split(ids, ",")
	if len(idsArr) == 1 {
		// 单个删除
		entity := &model.City{Id: gconv.Int(ids)}
		rows, err := entity.Delete()
		if err != nil || rows == 0 {
			return 0, errors.New("删除失败")
		}
		return rows, nil
	} else {
		// 批量删除
		return 0, nil
	}
}

func (s *cityService) GetChilds(cityCode string) ([]model.City, error) {
	var info model.City
	has, err := utils.XormDb.Where("citycode=?", cityCode).Get(&info)
	if err != nil || !has {
		return nil, errors.New("城市不能存在")
	}
	list := make([]model.City, 0)
	utils.XormDb.Where("pid=? and mark=1", info.Id).Find(&list)
	if err != nil {
		return nil, err
	}
	return list, nil
}

func (s *cityService) GetCityName(cityCode string, delimiter string) string {
	info := &model.City{Citycode: cityCode}
	has, err := info.Get()
	if err != nil || !has {
		return ""
	}
	// 城市ID
	cityId := info.Id
	// 声明数组
	list := make([]string, 0)
	for {
		if cityId <= 0 {
			// 退出
			break
		}
		// 业务处理
		has, err := utils.XormDb.Id(cityId).Get(&info)
		if err != nil || !has {
			break
		}
		// 上级栏目ID
		cityId = info.Pid
		// 加入数组
		list = append(list, info.Name)
	}
	// 结果数据处理
	if len(list) > 0 {
		// 数组反转
		utils.Reverse(&list)
		// 拼接字符串
		return strings.Join(list, delimiter)
	}
	return ""
}