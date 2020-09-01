# [英文文档](./README.md)

# 编辑npm配置

# 安装

```javascript
npm i ed-cfg -g
```
# 使用

## -recommend

```javascript
ed-cfg -rec
```

## -set

### proxy
```javascript
ed-cfg -s proxy socks5://127.0.0.1:1080
```

### progress
```javascript
ed-cfg -s progress false
```

### loglevel
```javascript
ed-cfg -s loglevel http
```

### registry
```javascript
ed-cfg -s registry https://mirrors.huaweicloud.com/repository/npm/
```

## -list

### list npm config

## -delete

### delete npm config

## -use

### set npm registry,eg: npm|taobao|huawei

```javascript
ed-cfg -u npm
```